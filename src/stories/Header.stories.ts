import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';

const meta = {
  title: 'Salty/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// const  navItems :  NavItem[] = [{label:'Home'}, {label:'Groups'},{label:'Users'}, {label:'Assignments'}, {label:'Profile'}];

export const Primary: Story = {
  args: {
    items: [
      { label: 'Home', href: '/home' },
      { label: 'Groups', href: '/groups' },
      { label: 'Users', href: '/users' },
      { label: 'Assignments', href: '/assignments' },
      { label: 'Profile', href: '/profile' }
    ]
  }
};
