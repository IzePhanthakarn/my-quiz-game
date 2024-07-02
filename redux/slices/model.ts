import { Crud } from "./crud/model";
import { Clinic, ClinicDetail } from "../../modules/clinic/redux/model";
import { Doctor } from "@/modules/doctor/redux/model";
import { BaseDrawer } from "@/components/BaseDrawer/redux/model";
import { BaseDialog } from "@/components/BaseDialog/redux/model";
import { Loading } from "@/components/Loading/redux/model";
import { Diploma } from "@/modules/diploma/redux/model";
import { Organ } from "@/modules/organ/redux/model";
import { Course } from "@/modules/course/redux/model";
export interface SliceModel {
	crud: Crud;
	doctor: Doctor;
	clinic: Clinic;
	drawer: BaseDrawer;
	dialog: BaseDialog;
	clinicDetail: ClinicDetail;
	loading: Loading;
	diploma: Diploma;
	organ: Organ;
	course: Course;
}
