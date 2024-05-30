import { DoctorInfomation, modelDoctorInfomation } from "./infomation/model";

export interface Doctor {
  infomation: DoctorInfomation;
}

export const modelDoctor: Doctor = {
  infomation: modelDoctorInfomation,
};
