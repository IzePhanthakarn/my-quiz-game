export interface BaseDialog {
	isOpen: boolean;
	isOpenBaseConfirmDialog: boolean;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOpenBaseConfirmDialog: false,
};
