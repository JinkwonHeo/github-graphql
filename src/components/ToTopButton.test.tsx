import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ToTopButton from './ToTopButton';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'style/theme';

test('Button should be clickable', () => {
  render(
    <Router>
      <ThemeProvider theme={theme}>
        <ToTopButton />
      </ThemeProvider>
    </Router>
  );

  const toTopButton = screen.getByRole('button');

  expect(toTopButton).toBeEnabled();
});
