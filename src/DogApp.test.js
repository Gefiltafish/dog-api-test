import React from 'react';
import { render } from '@testing-library/react';
import DogApp from './DogApp';

test('Expect page to load in as expected', () => {
  const { getByText } = render(<DogApp />);
  const headerText = getByText(/Welcome to the dog chooser 3000/i);
  expect(headerText).toBeInTheDocument();
});
