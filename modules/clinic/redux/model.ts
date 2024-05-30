import { getCurrentDateString } from "@/utils";
import { ClinicForm, ClinicGrid, modelClinicForm } from "./infomation/model";

export interface Clinic {
  infomation: ClinicForm;
  grid: ClinicGrid[];
}

export const modelClinic: Clinic = {
  infomation: modelClinicForm,
  grid: [],
};
