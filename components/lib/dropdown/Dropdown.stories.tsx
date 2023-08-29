import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownItem } from './Dropdown';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: DropdownItem[] = [
  { displayValue: 'green', id: '1', value: '00ff00' },
  { displayValue: 'blue', id: '2', value: '0000ff' },
  { displayValue: 'red', id: '3', value: 'ff0000' },
];

export const Default: Story = {
  args: {
    items: items,
    value: items[0],
  },
};

export const Empty: Story = {
  args: {
    items: [],
    value: undefined,
  },
};

export const NoItemSelected: Story = {
  args: {
    items: items,
    value: undefined,
  },
};

export const CustomItemRenderer: Story = {
  args: {
    items: items,
    value: items[1],
    itemRenderer(item: DropdownItem) {
      return (
        <div key={item.id}>
          <i>{item.id}</i>
          {item.displayValue}
        </div>
      );
    },
  },
};
