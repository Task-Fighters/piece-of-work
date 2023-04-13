import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/Card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Salty/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: "Primary",
    subtitle: "Subtitle",
    feature: "Feature Text",
    limittext: 300,
  },
};
