import type { Meta, StoryObj } from "@storybook/react";

import VotingPage from "./VotingPage";

const meta: Meta<typeof VotingPage> = {
  component: VotingPage,
};

export default meta;

type Story = StoryObj<typeof VotingPage>;

export const Primary: Story = {};
