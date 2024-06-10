import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../Pages';
import { useRegister } from '../hooks/index';

jest.mock('../hooks/index');

const mockUseRegister = useRegister as jest.Mock;

describe('Register Component', () => {
  const registerMock = jest.fn();

  beforeEach(() => {
    mockUseRegister.mockReturnValue({
      error: null,
      register: registerMock,
    });

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('renders register title', () => {
    const registerTitle = screen.getByText(/Register/i, { selector: 'h1' });
    expect(registerTitle).toBeInTheDocument();
  });

  test('renders email input', () => {
    const emailInput = screen.getByPlaceholderText('email');
    expect(emailInput).toBeInTheDocument();
  });

  test('renders username input', () => {
    const usernameInput = screen.getByPlaceholderText('username');
    expect(usernameInput).toBeInTheDocument();
  });

  test('renders remember me checkbox', () => {
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).toBeInTheDocument();
  });

  test('renders password input', () => {
    const passwordInput = screen.getByPlaceholderText('password');
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders register button', () => {
    const registerButton = screen.getByRole('button', { name: /Register/i });
    expect(registerButton).toBeInTheDocument();
  });

  test('renders login link', () => {
    const loginLink = screen.getByText('Login', { selector: 'a' });
    expect(loginLink).toBeInTheDocument();
  });

  test('handles input changes', () => {
    const emailInput = screen.getByPlaceholderText('email');
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  test('handles form submission', async () => {
    const emailInput = screen.getByPlaceholderText('email');
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const registerButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  test('displays error message on register failure', async () => {
    const registerError = "Invalid email or password";
    mockUseRegister.mockReturnValue({
      error: registerError,
      register: registerMock,
    });

    cleanup();
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const registerButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(registerError);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
