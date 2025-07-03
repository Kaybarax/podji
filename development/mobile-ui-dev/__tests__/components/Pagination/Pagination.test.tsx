import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pagination } from '../../../lib/components/Pagination/Pagination';

describe('Pagination Component', () => {
  it('renders correctly with default props', () => {
    const onPageChangeMock = jest.fn();
    const { getByTestId } = render(
      <Pagination totalPages={5} currentPage={1} onPageChange={onPageChangeMock} testID="test-pagination" />,
    );
    expect(getByTestId('test-pagination')).toBeTruthy();
  });

  it('renders correct number of page buttons', () => {
    const onPageChangeMock = jest.fn();
    const { getAllByRole } = render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChangeMock} />);

    // 5 page buttons + 1 next button (prev is disabled for page 1)
    expect(getAllByRole('button')).toHaveLength(6);
  });

  it('calls onPageChange when a page button is pressed', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChangeMock} />);

    fireEvent.press(getByText('2'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when current page button is pressed', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChangeMock} />);

    fireEvent.press(getByText('3'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when disabled', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={5} currentPage={1} onPageChange={onPageChangeMock} disabled />,
    );

    fireEvent.press(getByText('2'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('renders first/last buttons when showFirstLast is true', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={10} currentPage={5} onPageChange={onPageChangeMock} showFirstLast />,
    );

    expect(getByText('«')).toBeTruthy(); // First page button
    expect(getByText('»')).toBeTruthy(); // Last page button
  });

  it('limits visible pages according to maxVisiblePages', () => {
    const onPageChangeMock = jest.fn();
    const { getAllByRole } = render(
      <Pagination totalPages={20} currentPage={10} onPageChange={onPageChangeMock} maxVisiblePages={5} />,
    );

    // 5 page buttons + 2 prev/next buttons
    expect(getAllByRole('button')).toHaveLength(7);
  });

  it('applies custom style', () => {
    const onPageChangeMock = jest.fn();
    const { getByTestId } = render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChangeMock}
        style={{ backgroundColor: 'red' }}
        testID="test-pagination"
      />,
    );

    const paginationElement = getByTestId('test-pagination');
    expect(paginationElement.props.style).toEqual(
      expect.arrayContaining([expect.anything(), { backgroundColor: 'red' }]),
    );
  });

  it('handles prev button press correctly', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChangeMock} />);

    fireEvent.press(getByText('‹'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('handles next button press correctly', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChangeMock} />);

    fireEvent.press(getByText('›'));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
