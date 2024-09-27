export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseHistoryDialog?: boolean;
	isOpenBaseConfirmDialog?: boolean | undefined;
	content?: JSX.Element | string;
	headerText?: string;
	uniqueContent?: JSX.Element;
	onConfirm?: () => void;
	onCancel?: () => void;
	width?: string | number;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseHistoryDialog: false,
	isOpenBaseConfirmDialog: false,
	onConfirm: () => {},
	onCancel: () => {},
	content: "",
	headerText: "",
};
