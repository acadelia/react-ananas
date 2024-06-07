import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Pages';
import { useLogin } from '../hooks/index';

jest.mock('../hooks/index');

const mockUseLogin = useLogin as jest.Mock;

describe('Login Component', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      error: null,
      login: loginMock,
    });

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('renders login title', () => {
    const loginTitle = screen.getByText(/Login/i, { selector: 'h1' });
    expect(loginTitle).toBeInTheDocument();
  });

  test('renders email input', () => {
    const emailInput = screen.getByPlaceholderText('email');
    expect(emailInput).toBeInTheDocument();
  });

  test('renders password input', () => {
    const passwordInput = screen.getByPlaceholderText('password');
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders remember me checkbox', () => {
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).toBeInTheDocument();
  });

  test('renders forgot password link', () => {
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  test('renders login button', () => {
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('renders register link', () => {
    const registerLink = screen.getByText('Register', { selector: 'a' });
    expect(registerLink).toBeInTheDocument();
  });

  test('handles input changes', () => {
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('handles form submission', async () => {
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('displays error message on login failure', async () => {
    const loginError = "Invalid email or password";
    mockUseLogin.mockReturnValue({
      error: loginError,
      login: loginMock,
    });

    cleanup();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(loginError);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
