import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';

it('can CREATE a new blank idea when the add button is clicked and auto focuses the title field', () => {
  const { getAllByTestId, getByTestId, getAllByPlaceholderText } = render(
    <App />
  );

  expect(getAllByTestId('idea-item').length).toBe(2);

  fireEvent.click(getByTestId('add-button'));

  expect(getAllByTestId('idea-item').length).toBe(3);

  expect(getAllByPlaceholderText('Add title...')[0]).toHaveFocus();

  expect(getAllByPlaceholderText('Add title...')[0]).toHaveValue('');
  expect(getAllByPlaceholderText('Add body...')[0]).toHaveValue('');
});

it('can UPDATE an idea in the list', () => {
  const { getAllByTestId, getByText } = render(<App />);

  expect(getAllByTestId('idea-item')[0]).toHaveTextContent('Learn TypeScript');

  fireEvent.change(getByText('Learn TypeScript'), {
    target: { value: 'Learn Go!' }
  });

  expect(getAllByTestId('idea-item')[0]).toHaveTextContent('Learn Go!');
});

it('can DELETE an idea when the delete button is clicked', () => {
  const { getAllByTestId, getByTestId } = render(<App />);

  expect(getAllByTestId('idea-item').length).toBe(2);
  expect(getAllByTestId('idea-item')[0]).toHaveTextContent('Learn TypeScript');

  fireEvent.click(getAllByTestId('delete-button')[0]);

  expect(getAllByTestId('idea-item').length).toBe(1);
  expect(getAllByTestId('idea-item')[0]).toHaveTextContent(
    'Come up with more ideas'
  );
});
