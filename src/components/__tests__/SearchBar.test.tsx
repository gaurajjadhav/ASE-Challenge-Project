import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with query', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button', { name: 'Search' });
    
    await user.type(input, 'test movie');
    await user.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
  });

  it('does not call onSearch when query is empty', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('trims whitespace from search query', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button', { name: 'Search' });
    
    await user.type(input, '  test movie  ');
    await user.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
  });

  it('disables search button when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeDisabled();
  });

  it('enables search button when input has content', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button', { name: 'Search' });
    
    await user.type(input, 'test');
    
    expect(button).not.toBeDisabled();
  });

  it('uses custom placeholder when provided', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });
});
