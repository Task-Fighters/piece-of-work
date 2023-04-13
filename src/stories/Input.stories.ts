import type { Meta, StoryObj } from "@storybook/react";
import Input from '../components/Input';

const meta = {
  title: "Salty/Main Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TextInput: Story = {
  args: {
    label: "label",
    case: 'text'
  },
};

export const Search: Story = {
  args: {
    case: 'search'
  },
};

export const Select: Story = {
  args: {

  }
}