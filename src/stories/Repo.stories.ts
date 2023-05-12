import type { Meta, StoryObj } from '@storybook/react';
import { Repo } from '../components/Repo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Salty/Repo',
  component: Repo,
  tags: ['autodocs']
} satisfies Meta<typeof Repo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    assignment: 'string',
    repoUrl: 'string',
    assignmentUrl: 0
  }
};
