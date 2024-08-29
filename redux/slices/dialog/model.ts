export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseConfirmDialog?: boolean | undefined;
	content?: JSX.Element;
	headerText?: string;
	uniqueContent?: JSX.Element;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseConfirmDialog: false,
};
