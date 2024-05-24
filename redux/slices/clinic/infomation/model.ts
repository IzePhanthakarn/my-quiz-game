import { getCurrentDateString } from "@/utils";

export interface ClinicInfomation {
  clinicCode: string;
  clinicName: string;
  isDeleted: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export const modelClinicInfomation: ClinicInfomation = {
  clinicCode: "888",
  clinicName: "ไนกี้คลีนิก",
  isDeleted: "",
  createdDate: getCurrentDateString(),
  createdBy: "",
  updatedDate: "",
  updatedBy: "",
};
