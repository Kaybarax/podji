import * as React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';
import { DatePickerProps, defaultDatePickerProps } from './types';

/**
 * DatePicker component for mobile applications
 */
export const DatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = defaultDatePickerProps.placeholder,
  format = defaultDatePickerProps.format,
  disabled = defaultDatePickerProps.disabled,
  style,
  testID,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(value || new Date());
  const [themeStyles, setThemeStyles] = React.useState<{
    container: StyleProp<ViewStyle>;
    input: StyleProp<ViewStyle>;
    inputText: StyleProp<TextStyle>;
    inputDisabled: StyleProp<ViewStyle>;
    inputTextDisabled: StyleProp<TextStyle>;
    calendarContainer: StyleProp<ViewStyle>;
    calendarHeader: StyleProp<ViewStyle>;
    calendarHeaderText: StyleProp<TextStyle>;
    calendarGrid: StyleProp<ViewStyle>;
    calendarDay: StyleProp<ViewStyle>;
    calendarDayText: StyleProp<TextStyle>;
    calendarDaySelected: StyleProp<ViewStyle>;
    calendarDaySelectedText: StyleProp<TextStyle>;
    calendarDayDisabled: StyleProp<ViewStyle>;
    calendarDayDisabledText: StyleProp<TextStyle>;
    calendarControls: StyleProp<ViewStyle>;
    calendarControlButton: StyleProp<ViewStyle>;
    calendarControlButtonText: StyleProp<TextStyle>;
  }>({
    container: {},
    input: {},
    inputText: {},
    inputDisabled: {},
    inputTextDisabled: {},
    calendarContainer: {},
    calendarHeader: {},
    calendarHeaderText: {},
    calendarGrid: {},
    calendarDay: {},
    calendarDayText: {},
    calendarDaySelected: {},
    calendarDaySelectedText: {},
    calendarDayDisabled: {},
    calendarDayDisabledText: {},
    calendarControls: {},
    calendarControlButton: {},
    calendarControlButtonText: {},
  });

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            width: '100%',
          },
          input: {
            backgroundColor: theme.light.color.component['date-picker'].background.base,
            borderWidth: 1,
            borderColor: theme.light.color.semantic.border.base,
            borderRadius: 4,
            padding: 12,
            minHeight: 48,
            justifyContent: 'center',
          },
          inputText: {
            color: theme.light.color.component['date-picker'].text.base,
            fontSize: theme.light.typography.fontSize.md,
          },
          inputDisabled: {
            backgroundColor: theme.light.color.component['date-picker'].background.disabled,
            borderColor: theme.light.color.semantic.border.disabled,
          },
          inputTextDisabled: {
            color: theme.light.color.component['date-picker'].text.disabled,
          },
          calendarContainer: {
            backgroundColor: theme.light.color.semantic.background.surface,
            borderRadius: 8,
            padding: 16,
            width: '90%',
            maxWidth: 320,
            alignSelf: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          calendarHeader: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          },
          calendarHeaderText: {
            fontSize: theme.light.typography.fontSize.lg,
            fontWeight: 'bold',
            color: theme.light.color.semantic.text.primary,
          },
          calendarGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
          calendarDay: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 2,
            borderRadius: 20,
          },
          calendarDayText: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.component['date-picker'].text.base,
          },
          calendarDaySelected: {
            backgroundColor: theme.light.color.component['date-picker'].background.selected,
          },
          calendarDaySelectedText: {
            color: theme.light.color.component['date-picker'].text.selected,
            fontWeight: 'bold',
          },
          calendarDayDisabled: {
            backgroundColor: theme.light.color.component['date-picker'].background.disabled,
          },
          calendarDayDisabledText: {
            color: theme.light.color.component['date-picker'].text.disabled,
          },
          calendarControls: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          },
          calendarControlButton: {
            padding: 8,
            borderRadius: 4,
            backgroundColor: theme.light.color.semantic.background.surface,
          },
          calendarControlButtonText: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentMonth(value);
    }
  }, [value]);

  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    if (format === 'MM/DD/YYYY') {
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    } else if (format === 'DD/MM/YYYY') {
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    } else if (format === 'YYYY-MM-DD') {
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  };

  const handleOpenPicker = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClosePicker = () => {
    setIsOpen(false);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    handleClosePicker();
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDate
      ? date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()
      : false;
  };

  const renderCalendar = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);

    // Adjust to start from Sunday
    startDate.setDate(1 - monthStart.getDay());

    // Ensure we have 6 weeks displayed (42 days)
    endDate.setDate(monthEnd.getDate() + (6 * 7 - (monthEnd.getDate() + monthStart.getDay())));

    const days = [];
    const currentDate = new Date(startDate);

    // Add weekday headers
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    weekdays.forEach(day => {
      days.push(
        <View key={`header-${day}`} style={themeStyles.calendarDay}>
          <Text style={themeStyles.calendarHeaderText}>{day}</Text>
        </View>,
      );
    });

    // Add calendar days
    while (currentDate <= endDate) {
      const dateClone = new Date(currentDate);
      const isDisabled = isDateDisabled(dateClone);
      const isSelected = isDateSelected(dateClone);
      const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();

      days.push(
        <TouchableOpacity
          key={`day-${currentDate.toISOString()}`}
          style={[
            themeStyles.calendarDay,
            isSelected && themeStyles.calendarDaySelected,
            isDisabled && themeStyles.calendarDayDisabled,
          ]}
          onPress={() => !isDisabled && handleSelectDate(dateClone)}
          disabled={isDisabled}
        >
          <Text
            style={[
              themeStyles.calendarDayText,
              isSelected && themeStyles.calendarDaySelectedText,
              isDisabled && themeStyles.calendarDayDisabledText,
              !isCurrentMonth && { opacity: 0.3 },
            ]}
          >
            {currentDate.getDate()}
          </Text>
        </TouchableOpacity>,
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  return (
    <View style={[themeStyles.container, style]} testID={testID}>
      <TouchableOpacity
        style={[themeStyles.input, disabled && themeStyles.inputDisabled]}
        onPress={handleOpenPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Open date picker"
      >
        <Text style={[themeStyles.inputText, disabled && themeStyles.inputTextDisabled]}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClosePicker}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          activeOpacity={1}
          onPress={handleClosePicker}
        >
          <View
            style={themeStyles.calendarContainer}
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => e.stopPropagation()}
          >
            <View style={themeStyles.calendarControls}>
              <TouchableOpacity style={themeStyles.calendarControlButton} onPress={handlePrevMonth}>
                <Text style={themeStyles.calendarControlButtonText}>{'<'}</Text>
              </TouchableOpacity>

              <Text style={themeStyles.calendarHeaderText}>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Text>

              <TouchableOpacity style={themeStyles.calendarControlButton} onPress={handleNextMonth}>
                <Text style={themeStyles.calendarControlButtonText}>{'>'}</Text>
              </TouchableOpacity>
            </View>

            <View style={themeStyles.calendarGrid}>{renderCalendar()}</View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
