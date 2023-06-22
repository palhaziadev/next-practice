import Calc from '../components/calc';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Calculator', () => {
  it('renders a calculator', () => {
    render(<Calc />);
    // check if all components are rendered
    expect(screen.getByTestId('result')).toBeInTheDocument();
    expect(screen.getByTestId('num1')).toBeInTheDocument();
    expect(screen.getByTestId('num2')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('subtract')).toBeInTheDocument();
    expect(screen.getByTestId('multiply')).toBeInTheDocument();
    expect(screen.getByTestId('divide')).toBeInTheDocument();
  });
});

it('adds numbers', async () => {
  render(<Calc />);
  // check if adds properly
  const num1input = screen.getByTestId('num1');
  const num2input = screen.getByTestId('num2');
  const addButton = screen.getByTestId('add');
  const resultArea = screen.getByTestId('result');
  fireEvent.change(num1input, { target: { value: 5 } });
  fireEvent.change(num2input, { target: { value: 8 } });
  await addButton.click();
  expect(resultArea).toHaveTextContent('13');
});
