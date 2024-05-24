import { Clinic } from "./clinic/model";
import { Doctor } from "./doctor/model";

export interface SliceModel {
  doctor: Doctor;
  clinic: Clinic;
}
