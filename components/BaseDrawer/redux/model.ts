import {
  FilterForm,
  modelFilterForm,
} from "../contents/filter-form/redux/model";

export interface BaseDrawer {
  isOpen: boolean;
  filterForm: FilterForm;
}

export const modelDrawer: BaseDrawer = {
  isOpen: false,
  filterForm: modelFilterForm,
};
