import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";

export interface BaseFormProviderProps {
	itemName?: string | string[];
	rules?: Array<{ [key: string]: any }>;
	value?: string | number | null;
	disabled?: boolean;
	label?: string;
	onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	labelPosition?: BaseFormItemPosition.LEFT | BaseFormItemPosition.TOP;
	labelLeftSpan?: number;
	children?: React.ReactNode;
	notForm?: boolean;
	className?: string;
}
