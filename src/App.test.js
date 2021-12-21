import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login and signup button', () => {
  render(<App />);
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeVisible();
  const signupElement = screen.getByText(/sign up/i);
  expect(signupElement).toBeVisible();
});
