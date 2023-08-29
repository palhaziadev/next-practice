import type { Meta, StoryObj } from '@storybook/react';

import InputField from './InputField';

const meta = {
  title: 'InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValue: Story = {
  args: {
    value: 'Test',
  },
};

export const WithNoValue: Story = {
  args: {
    value: '',
  },
};

export const Placeholder: Story = {
  args: {
    value: '',
    placeholder: 'Placeholder',
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    value: 'disabled',
    disabled: true,
  },
};
