import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Button from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "var(--ui-background-primary)" },
        { name: "dark", value: "var(--ui-background-primary)" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "tinted", "gray", "plain"],
      description: "The visual style of the button.",
      table: { defaultValue: { summary: "filled" } },
    },
    // intent argType removed
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button.",
      table: { defaultValue: { summary: "medium" } },
    },
    children: {
      control: "text",
      description: "The content of the button.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled.",
      table: { defaultValue: { summary: "false" } },
    },
    onClick: { action: "clicked", description: "Optional click handler" },
    className: { control: "text", description: "Optional additional CSS classes" },
  },
  args: {
    // Default args for all stories
    children: "Button Text",
    variant: "filled", // Default variant
    // intent arg removed
    size: "medium",
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Base story to showcase controls via ArgsTable
export const Default: Story = {
  args: {
    children: "Default (Filled)",
  },
}

// Stories for each variant
export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Filled Button",
  },
}

export const Tinted: Story = {
  args: {
    variant: "tinted",
    children: "Tinted Button",
  },
}

export const Gray: Story = {
  args: {
    variant: "gray",
    children: "Gray Button",
  },
}

export const Plain: Story = {
  args: {
    variant: "plain",
    children: "Plain Button",
  },
}

// Stories for sizes (using default filled variant)
export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
}

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Medium Button",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
}

// Story for disabled state (using default filled variant)
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
}

// Story for Dark Mode (using default filled variant)
export const FilledDark: Story = {
  args: {
    variant: "filled",
    children: "Filled Button (Dark)",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (StoryComponent) => (
      <div className="dark">
        <StoryComponent />
      </div>
    ),
  ],
}
