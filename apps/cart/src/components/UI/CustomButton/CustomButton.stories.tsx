import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./";

const meta: Meta<typeof CustomButton> = {
  title: "UI/CustomButton",
  component: CustomButton,
};
export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {
  args: { children: "Кнопка" },
};

export const Primary: Story = {
  args: {
    children: "ОФОРМИТЬ",
    style: {
      backgroundColor: "#215dff",
      color: "#ffffff",
      cursor: "pointer",
      padding: "12px 24px",
      width: "fit-content",
      border: "none",
      borderRadius: "8px",
    },
  },
};
