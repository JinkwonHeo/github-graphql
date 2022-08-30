import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from './Search';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'style/theme';

const mock = {
  searchedWord: '',
  setSearchedWord: () => {
    return 'set';
  },
};

test('Button should be clickable', () => {
  render(
    <Router>
      <ThemeProvider theme={theme}>
        <Search {...mock} />
      </ThemeProvider>
    </Router>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  const textEl = screen.getByText(/Search/i);
  expect(textEl).toBeTruthy();
});

test('Button should be disabled', () => {
  render(
    <Router>
      <ThemeProvider theme={theme}>
        <Search {...mock} />
      </ThemeProvider>
    </Router>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
});
