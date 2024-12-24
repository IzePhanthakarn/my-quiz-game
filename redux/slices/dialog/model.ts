import {
	ConfirmModalTypes,
	IconTheme,
} from "wcf-component-lib/src/components/BaseDialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";

export interface BaseDialog {
	isOpen: boolean;
	isOverFlow?: boolean;
	isOpenBaseConfirmDialog?: boolean | undefined;
	content?: JSX.Element | string;
	headerText?: string;
	uniqueContent?: JSX.Element;
	onConfirm?: () => void;
	onCancel?: () => void;
	width?: string | number;
	labelConfirm?: string;
	baseDialogType?: BaseDialogType | ConfirmModalTypes;
	headerLeftIcon?: JSX.Element;
	showCancel?: boolean;
	themeIcon?: IconTheme;
	maxHeight?: string;
	maxWidth?: string;
	key?: string;
}

export const modelDialog: BaseDialog = {
	isOpen: false,
	isOverFlow: false,
	isOpenBaseConfirmDialog: false,
	onConfirm: () => {},
	onCancel: () => {},
	width: 522,
};
