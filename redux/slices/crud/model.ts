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

export type formDataType = clinicForm & doctorForm;

interface clinicForm {
  name: string;
  age: string;
}

interface doctorForm {
  name: string;
}

const initClinic: clinicForm = {
  age: "",
  name: "",
};

const initDoctor: doctorForm = {
  name: "",
};

const initFormData: formDataType = {
  ...initClinic,
  ...initDoctor,
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
