import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Numeric from '../Numeric'

test('renders Numeric input', async () => {
  const handleChange = jest.fn();
  render(<Numeric label="Label" value={5} onChange={handleChange} />)

  expect(screen.getByRole('label')).toHaveTextContent('Label')
})

test('increases value on increase button click', async () => {
  let value = 0;
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Numeric label="Label" value={value} onChange={handleChange} />)

  // decrease should be disabled because minValue is 0 by default
  expect(screen.getByTestId('decrease')).toBeDisabled();
  // handling increase
  fireEvent.click(screen.getByTestId('increase'))
  expect(handleChange).toBeCalled();
  expect(value).toBe(1);
});

test('decreases value on decrease button click', async () => {
  let value = 1;
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Numeric label="Label" value={value} onChange={handleChange} />)

  fireEvent.click(screen.getByTestId('decrease'))
  expect(handleChange).toBeCalled();
  expect(value).toBe(0);
});

test('decrease button disabled when value equals minimum value', async () => {
  let value = 5;
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Numeric label="Label" value={value} onChange={handleChange} minValue={5}/>)

  expect(screen.getByTestId('decrease')).toBeDisabled();
  expect(screen.getByTestId('increase')).toBeEnabled();
});

test('increase button disabled when value equals maximum value', async () => {
  let value = 5;
  const handleChange = jest.fn((newValue) => value = newValue);
  render(<Numeric label="Label" value={value} onChange={handleChange} maxValue={5}/>)

  expect(screen.getByTestId('decrease')).toBeEnabled();
  expect(screen.getByTestId('increase')).toBeDisabled();
});