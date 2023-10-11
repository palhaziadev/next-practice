import Dropdown from './Dropdown';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@/__tests__/helpers';

describe('Dropdown', () => {
  test('should toggle on click selected item', async () => {
    const user = userEvent.setup();

    await renderWithIntl(
      <Dropdown
        value={undefined}
        items={[
          { displayValue: 'Test 1', id: '1', value: 'test1' },
          { displayValue: 'Test 2', id: '2', value: 'test2' },
        ]}
      />
    );

    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();

    await user.click(screen.getByText('No item selected'));

    expect(screen.queryByText('Test 1')).toBeInTheDocument();

    await user.click(screen.getByText('Test 2'));

    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();
  });

  test('should loads without items', async () => {
    const user = userEvent.setup();

    await renderWithIntl(<Dropdown value={undefined} items={[]} />);

    expect(screen.getByText('No item selected')).toBeInTheDocument();

    await user.click(screen.getByText('No item selected'));

    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();
  });

  test('should loads and displays items when no item selected', async () => {
    const user = userEvent.setup();

    await renderWithIntl(
      <Dropdown
        value={undefined}
        items={[
          { displayValue: 'Test 1', id: '1', value: 'test1' },
          { displayValue: 'Test 2', id: '2', value: 'test2' },
        ]}
      />
    );

    expect(screen.getByText('No item selected')).toBeInTheDocument();

    await user.click(screen.getByText('No item selected'));

    expect(screen.getByText('No item selected')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  test('should loads and displays items when item selected', async () => {
    const user = userEvent.setup();

    await renderWithIntl(
      <Dropdown
        value={{ displayValue: 'Test 2', id: '2', value: 'test2' }}
        items={[
          { displayValue: 'Test 1', id: '1', value: 'test1' },
          { displayValue: 'Test 2', id: '2', value: 'test2' },
        ]}
      />
    );

    expect(screen.getAllByText('Test 2')).toHaveLength(1);

    await user.click(screen.getByText('Test 2'));

    expect(screen.getAllByText('Test 2')).toHaveLength(2);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });

  test('should work with custom renderer', async () => {
    const user = userEvent.setup();

    await renderWithIntl(
      <Dropdown
        value={{ displayValue: 'Test 2', id: '2', value: 'test2' }}
        itemRenderer={(item) => <span key={item.id}>{item.id} custom</span>}
        items={[
          { displayValue: 'Test 1', id: '1', value: 'test1' },
          { displayValue: 'Test 2', id: '2', value: 'test2' },
        ]}
      />
    );

    expect(screen.getByText('2 custom')).toBeInTheDocument();
    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();

    await user.click(screen.getByText('2 custom'));

    expect(screen.getAllByText('2 custom')).toHaveLength(2);
    expect(screen.getByText('1 custom')).toBeInTheDocument();
  });

  test('should toggle on click and close on click outside', async () => {
    const user = userEvent.setup();

    await renderWithIntl(
      <Dropdown
        value={undefined}
        items={[
          { displayValue: 'Test 1', id: '1', value: 'test1' },
          { displayValue: 'Test 2', id: '2', value: 'test2' },
        ]}
      />
    );

    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();

    await user.click(screen.getByText('No item selected'));

    expect(screen.queryByText('Test 1')).toBeInTheDocument();
    expect(screen.queryByText('Test 2')).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByText('Test 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test 2')).not.toBeInTheDocument();
  });
});
