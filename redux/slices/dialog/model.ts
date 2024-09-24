export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseConfirmDialog?: boolean | undefined;
	content?: JSX.Element | string;
	headerText?: string;
	uniqueContent?: JSX.Element;
	onConfirm?: () => void;
	onCancel?: () => void;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseConfirmDialog: false,
	onConfirm: () => {},
	onCancel: () => {},
	content: "",
	headerText: "",
};
