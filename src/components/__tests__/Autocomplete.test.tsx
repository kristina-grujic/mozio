import React from 'react'
import {render, fireEvent, screen, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import Autocomplete from '../Autocomplete'

test('renders Autocomplete input', async () => {
  const handleChange = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} />)

  expect(screen.getByText('Label')).toBeDefined();
})

test('Autocomplete has no options by default', async () => {
  const handleChange = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} />)

  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('No options')).toBeDefined();
})

test('Autocomplete renders options when searching', async () => {
  const handleChange = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} />)

  fireEvent.change(screen.getByRole('combobox'), {target: {value: 'Pa'}})
  expect(screen.getByText('Loading', {exact: false})).toBeDefined();
  await waitForElementToBeRemoved(screen.getByText('Loading', {exact: false}));
  expect(screen.getByText('Paris')).toBeDefined();
})

test('Autocomplete changes on option selection', async () => {
  let value = null;
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Autocomplete label="Label" value={value} onChange={handleChange} />)

  fireEvent.change(screen.getByRole('combobox'), {target: {value: 'Pa'}})
  await waitForElementToBeRemoved(screen.getByText('Loading', {exact: false}));
  fireEvent.click(screen.getByText('Paris'));
  expect(value).toEqual('Paris');
})