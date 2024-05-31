import { Crud } from "./crud/model";
import { Clinic } from "../../modules/clinic/redux/model";
import { Doctor } from "@/modules/doctor/redux/model";
import { BaseDrawer } from "@/components/BaseDrawer/redux/model";
export interface SliceModel {
  crud: Crud;
  doctor: Doctor;
  clinic: Clinic;
  drawer: BaseDrawer;
}
