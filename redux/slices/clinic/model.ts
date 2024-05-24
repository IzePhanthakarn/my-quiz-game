import { getCurrentDateString } from "@/utils";
import { ClinicInfomation, modelClinicInfomation } from "./infomation/model";

export interface Clinic {
  infomation: ClinicInfomation;
}

export const modelClinic: Clinic = {
  infomation: modelClinicInfomation,
};
