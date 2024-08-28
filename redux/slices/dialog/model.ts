export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseConfirmDialog?: boolean;
	content?: JSX.Element;
	headerText?: string;
	uniqueContent?: JSX.Element;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseConfirmDialog: false,
};
