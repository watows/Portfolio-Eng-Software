import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../pages/login.jsx';

describe('Login Component', () => {
  it('should render the login page correctly', () => {
    render(<App />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('senha')).toBeInTheDocument();

    expect(screen.getByText('entrar')).toBeInTheDocument();
  });

  it('should update email and password input values', () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText('e-mail');
    const passwordInput = screen.getByPlaceholderText('senha');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('should call handleLogin function on login button click', async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText('e-mail');
    const passwordInput = screen.getByPlaceholderText('senha');
    const loginButton = screen.getByText('entrar');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

  });

  it('should display an error message if login fails', async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText('e-mail');
    const passwordInput = screen.getByPlaceholderText('senha');
    const loginButton = screen.getByText('entrar');

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(loginButton);

    await screen.findByText(/Login falhou! Verifique seu e-mail e senha/);
  });
});