import { BaseFormItemPosition } from "../../constants/form-item-position";

export interface BaseFormProviderProps {
	itemName?: string | string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
