import type { NotificationArgsProps } from "wcf-component-lib/node_modules/antd";
type NotificationPlacement = NotificationArgsProps["placement"];

export interface ToastNotification {
	isOpen: boolean;
	placement?: NotificationPlacement;
	message: string;
	description: string;
	type: "success" | "info" | "warning" | "error";
}

export const modelToastNotification: ToastNotification = {
	isOpen: false,
	message: "",
	description: "",
	type: "info",
};
