import type { Meta, StoryObj } from '@storybook/react';
import UserDetails from 'components/UserDetails';

const meta = {
  title: 'Salty/User Details',
  component: UserDetails,
  tags: ['autodocs']
} satisfies Meta<typeof UserDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 23,
    name: 'Joyce Oliveira',
    email: 'joyce@appliedtechnology.se'
  }
};
