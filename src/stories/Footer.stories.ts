import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/Footer';

const meta = {
  title: 'Salty/Mobile Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserFooter: Story = {
  args: {
    role: 'user',
    image: ''
  }
};

export const AdminFooter: Story = {
  args: {
    role: 'admin',
    image:
      'https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
};
