import type { Meta, StoryObj } from "@storybook/react";

import StateSelectionPage from "./StateSelectionPage";

const meta: Meta<typeof StateSelectionPage> = {
  component: StateSelectionPage,
};

export default meta;

type Story = StoryObj<typeof StateSelectionPage>;

export const Primary: Story = {};
