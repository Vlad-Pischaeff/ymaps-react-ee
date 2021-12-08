import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import removeItem from './components/RouteList';

describe('removeItem', () => {
  test('remove item from array', () => {
    expect(removeItem(2)).toBe(6);
  });
});
