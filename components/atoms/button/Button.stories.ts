import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonSize, ButtonType } from './Button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary',
    type: ButtonType.Primary,
    size: ButtonSize.Normal,
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary',
    type: ButtonType.Secondary,
    size: ButtonSize.Normal,
  },
};

export const Small: Story = {
  args: {
    text: 'small',
    size: ButtonSize.Small,
  },
};

export const Disabled: Story = {
  args: {
    text: 'disabled',
    disabled: true,
  },
};
