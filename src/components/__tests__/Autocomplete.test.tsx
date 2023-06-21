import React from 'react'
import {render, fireEvent, screen, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import Autocomplete from '../Autocomplete'
import { wait } from '@testing-library/user-event/dist/utils'

test('renders Autocomplete input', async () => {
  const handleChange = jest.fn();
  const mockFunction = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} onBlur={mockFunction} onFocus={mockFunction}/>)

  expect(screen.getByText('Label')).toBeDefined();
})

test('Autocomplete has no options by default', async () => {
  const handleChange = jest.fn();
  const mockFunction = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} onBlur={mockFunction} onFocus={mockFunction} />)

  await fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('No options available for searched keyword')).toBeDefined();
})

test('Autocomplete renders options when searching', async () => {
  const handleChange = jest.fn();
  const mockFunction = jest.fn();
  render(<Autocomplete label="Label" value={null} onChange={handleChange} onBlur={mockFunction} onFocus={mockFunction} skipDebounce/>)

  fireEvent.change(screen.getByRole('combobox'), {target: {value: 'Pa'}})
  expect(screen.getByText('Loading', {exact: false})).toBeDefined();
  await waitForElementToBeRemoved(screen.getByText('Loading', {exact: false}));
  expect(screen.getByText('Paris')).toBeDefined();
})

test('Autocomplete changes on option selection', async () => {
  let value = null;
  const mockFunction = jest.fn();
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Autocomplete label="Label" value={value} onChange={handleChange} onBlur={mockFunction} onFocus={mockFunction} skipDebounce/>)

  fireEvent.change(screen.getByRole('combobox'), {target: {value: 'Pa'}})
  await waitForElementToBeRemoved(screen.getByText('Loading', {exact: false}));
  fireEvent.click(screen.getByText('Paris'));
  expect(value).toEqual('Paris');
})