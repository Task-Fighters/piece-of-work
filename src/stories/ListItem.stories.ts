import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from 'components/ListItem';

const meta = {
  title: 'Salty/List_Items',
  component: ListItem,
  tags: ['autodocs']
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Title',
    route: 'home',
    iconDelete: false,
    iconEdit: false,
    id: 0
  }
};
