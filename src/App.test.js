import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login and signup button', () => {
  render(<App />);
  const loginElement = screen.getByRole("button", { name: /log in/i });
  expect(loginElement).toBeVisible();
  const signupElement = screen.getByRole("button", { name: /sign up/i });
  expect(signupElement).toBeVisible();
});
