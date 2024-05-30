import { getCurrentDateString } from "@/utils";

export interface DoctorInfomation {
  clinicCode: string;
  clinicName: string;
  isDeleted: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export const modelDoctorInfomation: DoctorInfomation = {
  clinicCode: "888",
  clinicName: "ไนกี้คลีนิก",
  isDeleted: "",
  createdDate: getCurrentDateString(),
  createdBy: "",
  updatedDate: "",
  updatedBy: "",
};
