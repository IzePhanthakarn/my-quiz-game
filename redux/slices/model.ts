import { Crud } from "./crud/model";
import { Clinic, ClinicDetail } from "../../modules/clinic/redux/model";
import { Doctor } from "@/modules/doctor/redux/model";
import { BaseDrawer } from "@/components/BaseDrawer/redux/model";
import { BaseDialog } from "@/components/BaseDialog/redux/model";
export interface SliceModel {
	crud: Crud;
	doctor: Doctor;
	clinic: Clinic;
	drawer: BaseDrawer;
	dialog: BaseDialog;
	clinicDetail: ClinicDetail;
}
