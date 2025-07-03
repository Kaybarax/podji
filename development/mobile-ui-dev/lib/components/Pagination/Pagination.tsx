import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';
import { PaginationProps, defaultPaginationProps } from './types';

/**
 * Pagination component for mobile applications
 */
export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  showPrevNext = defaultPaginationProps.showPrevNext,
  showFirstLast = defaultPaginationProps.showFirstLast,
  maxVisiblePages = defaultPaginationProps.maxVisiblePages,
  disabled = defaultPaginationProps.disabled,
  style,
  testID,
}: PaginationProps) => {
  const [themeStyles, setThemeStyles] = React.useState<{
    container: StyleProp<ViewStyle>;
    button: StyleProp<ViewStyle>;
    buttonActive: StyleProp<ViewStyle>;
    buttonDisabled: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
    buttonTextActive: StyleProp<TextStyle>;
    buttonTextDisabled: StyleProp<TextStyle>;
  }>({
    container: {},
    button: {},
    buttonActive: {},
    buttonDisabled: {},
    buttonText: {},
    buttonTextActive: {},
    buttonTextDisabled: {},
  });

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          button: {
            backgroundColor: theme.light.color.component.pagination.button.background.base,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginHorizontal: 4,
            borderRadius: 4,
            minWidth: 40,
            alignItems: 'center',
            justifyContent: 'center',
          },
          buttonActive: {
            backgroundColor: theme.light.color.component.pagination.button.background.active,
          },
          buttonDisabled: {
            backgroundColor: theme.light.color.component.pagination.button.background.disabled,
          },
          buttonText: {
            color: theme.light.color.component.pagination.button.text.base,
            fontSize: theme.light.typography.fontSize.md,
          },
          buttonTextActive: {
            color: theme.light.color.component.pagination.button.text.active,
            fontWeight: 'bold',
          },
          buttonTextDisabled: {
            color: theme.light.color.component.pagination.button.text.disabled,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  // Calculate visible page range
  const getVisiblePages = () => {
    if (!maxVisiblePages || totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handlePageChange = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  const renderPageButton = (page: number, label?: string, isDisabled?: boolean) => {
    const isActive = page === currentPage;
    const buttonDisabled = disabled || isDisabled;
    
    return (
      <TouchableOpacity
        key={`page-${page}`}
        onPress={() => handlePageChange(page)}
        disabled={buttonDisabled}
        accessibilityRole="button"
        accessibilityLabel={`Page ${label || page}`}
        testID={`${testID}-page-${page}`}
        style={[
          themeStyles.button,
          isActive && themeStyles.buttonActive,
          buttonDisabled && themeStyles.buttonDisabled,
        ]}
      >
        <Text
          style={[
            themeStyles.buttonText,
            isActive && themeStyles.buttonTextActive,
            buttonDisabled && themeStyles.buttonTextDisabled,
          ]}
        >
          {label || page}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[themeStyles.container, style]} testID={testID}>
      {showFirstLast && renderPageButton(1, '«', currentPage === 1)}
      {showPrevNext && renderPageButton(Math.max(1, currentPage - 1), '‹', currentPage === 1)}
      
      {visiblePages.map(page => renderPageButton(page))}
      
      {showPrevNext && renderPageButton(Math.min(totalPages, currentPage + 1), '›', currentPage === totalPages)}
      {showFirstLast && renderPageButton(totalPages, '»', currentPage === totalPages)}
    </View>
  );
};