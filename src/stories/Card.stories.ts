import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'components/Card';

const meta = {
  title: 'Salty/Card',
  component: Card,
  tags: ['autodocs']
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cardType: 'card',
    title: 'Primary',
    subtitle: 'Subtitle',
    description: 'Feature Text'
  }
};
