import {
	ClinicForm,
	modelClinicForm,
} from "@/modules/clinic/redux/master/model";

export interface Crud {
	formData: formDataType;
	formErrors: Array<string>;
	masterData: formDataType;
	isLoading: boolean;
	isSubmitting: boolean;
	isShowHistoryDrawer: boolean;
	crudConfig: boolean;
	bodyMutation: boolean;
}

export type formDataType = ClinicForm;

const initFormData: formDataType = {
	...modelClinicForm,
};

export const initialState: Crud = {
	formData: { ...initFormData },
	formErrors: [],
	masterData: { ...initFormData },
	isLoading: false,
	isSubmitting: false,
	isShowHistoryDrawer: false,
	crudConfig: false,
	bodyMutation: false,
};
