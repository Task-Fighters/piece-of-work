import type { Meta, StoryObj } from '@storybook/react';
import { Repository } from 'components/Repository';

const meta = {
  title: 'Salty/Repo',
  component: Repository,
  tags: ['autodocs']
} satisfies Meta<typeof Repository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    assignment: 'string',
    repoUrl: 'string',
    assignmentUrl: 0
  }
};
