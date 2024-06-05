import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Pages';

test('renders learn react link', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/SignUp/i);
  expect(linkElement).toBeInTheDocument();
});
