import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../components/ListItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Salty/List_Items',
  component: ListItem,
  tags: ['autodocs']
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Title',
    route: 'home',
    iconDelete: false,
    iconEdit: false,
    id: 0
  }
};
