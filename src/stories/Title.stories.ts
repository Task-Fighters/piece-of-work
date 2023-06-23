import type { Meta, StoryObj } from '@storybook/react';
import Title from 'components/Title';

const meta = {
  title: 'Salty/Title',
  component: Title,
  tags: ['autodocs']
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Title'
  }
};
