export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseConfirmDialog?: boolean | undefined;
	content?: JSX.Element;
	headerText?: string;
	uniqueContent?: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseConfirmDialog: false,
};
