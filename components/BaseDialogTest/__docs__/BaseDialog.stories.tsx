import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import React from "react";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof Example> = {
	title: "BaseComponent/BaseDialog",
	component: Example,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Example>;

export const DefaultDialog: Story = {
	args: {
		isOpen: false,
		content: <div>Content</div>,
	},
};

export const InteractionDialog: Story = {
	args: {
		isOpen: false,
		content: <div>Interaction Dialog test3</div>,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const testButton = canvas.getByText("Test");
		await userEvent.click(testButton);
	},
};
