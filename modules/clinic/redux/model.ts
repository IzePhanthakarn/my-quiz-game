import { ClinicForm, ClinicGrid, modelClinicForm } from "./master/model";

export interface Clinic {
  infomation: ClinicForm;
  grid: ClinicGrid[];
}

export const modelClinic: Clinic = {
  infomation: modelClinicForm,
  grid: [],
};
