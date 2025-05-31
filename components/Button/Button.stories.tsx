import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import React from 'react'; // Import React for JSX

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--ui-background-primary)' }, // Use CSS var for light bg
        { name: 'dark', value: 'var(--ui-background-primary)' },  // Use CSS var for dark bg (it will be different in dark mode)
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'tinted', 'gray', 'plain'],
      description: 'The visual style of the button.',
      table: { defaultValue: { summary: 'filled' } },
    },
    intent: {
      control: 'select',
      options: ['primary', 'destructive', 'none'],
      description: 'The purpose or emphasis of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button.',
      table: { defaultValue: { summary: 'medium' } },
    },
    children: {
      control: 'text',
      description: 'The content of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: { action: 'clicked', description: 'Optional click handler' },
    className: { control: 'text', description: 'Optional additional CSS classes' },
  },
  args: { // Default args for all stories
    children: 'Button Text',
    variant: 'filled',
    intent: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base story to showcase controls
export const Default: Story = {};

// Filled Variants
export const FilledPrimary: Story = {
  args: {
    variant: 'filled',
    intent: 'primary',
    children: 'Filled Primary',
  },
};

export const FilledDestructive: Story = {
  args: {
    variant: 'filled',
    intent: 'destructive',
    children: 'Filled Destructive',
  },
};

export const FilledNone: Story = {
  args: {
    variant: 'filled',
    intent: 'none',
    children: 'Filled None',
  },
};

// Tinted Variants
export const TintedPrimary: Story = {
  args: {
    variant: 'tinted',
    intent: 'primary',
    children: 'Tinted Primary',
  },
};

export const TintedDestructive: Story = {
  args: {
    variant: 'tinted',
    intent: 'destructive',
    children: 'Tinted Destructive',
  },
};

export const TintedNone: Story = {
  args: {
    variant: 'tinted',
    intent: 'none',
    children: 'Tinted None',
  },
};

// Gray Variants
export const GrayPrimaryIntent: Story = {
  args: {
    variant: 'gray',
    intent: 'primary', // Will render with blue text due to component logic
    children: 'Gray Primary Intent',
  },
};

export const GrayDestructiveIntent: Story = {
  args: {
    variant: 'gray',
    intent: 'destructive',
    children: 'Gray Destructive',
  },
};

export const GrayNoneIntent: Story = {
  args: {
    variant: 'gray',
    intent: 'none',
    children: 'Gray None Intent',
  },
};

// Plain Variants
export const PlainPrimaryIntent: Story = {
  args: {
    variant: 'plain',
    intent: 'primary',
    children: 'Plain Primary Intent',
  },
};

export const PlainDestructiveIntent: Story = {
  args: {
    variant: 'plain',
    intent: 'destructive',
    children: 'Plain Destructive',
  },
};

export const PlainNoneIntent: Story = {
  args: {
    variant: 'plain',
    intent: 'none',
    children: 'Plain None Intent',
  },
};

// Sizes
export const SmallButton: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const LargeButton: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// Disabled State Example (using filled primary)
export const DisabledButton: Story = {
  args: {
    variant: 'filled',
    intent: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

// Example for Dark Mode (configure Storybook background addon or global decorator for .dark class)
export const FilledPrimaryDark: Story = {
  args: {
    variant: 'filled',
    intent: 'primary',
    children: 'Filled Primary (Dark)',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark"> {/* Use JSX for the decorator */}
        <Story />
      </div>
    ),
  ],
};
