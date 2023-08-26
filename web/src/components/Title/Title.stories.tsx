// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Primary: Story = {};
