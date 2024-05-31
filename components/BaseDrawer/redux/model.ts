import { FilterForm, modelFilterForm } from "./filter/model";

export interface BaseDrawer {
  isOpen: boolean;
  filterForm: FilterForm;
}

export const modelDrawer: BaseDrawer = {
  isOpen: false,
  filterForm: modelFilterForm,
};
