export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseOverFlowDialog?: boolean;
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
	isOpenBaseOverFlowDialog: false,
	isOpenBaseConfirmDialog: false,
	onConfirm: () => {},
	onCancel: () => {},
	content: "",
	headerText: "",
};
