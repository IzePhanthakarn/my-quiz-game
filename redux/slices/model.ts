import { Crud } from "./crud/model";
import { Clinic, ClinicDetail } from "../../modules/clinic/redux/model";
import { Doctor } from "@/modules/doctor/redux/model";
import { BaseDrawer } from "@/components/BaseDrawer/redux/model";
import { BaseDialog } from "@/components/BaseDialog/redux/model";
import { Loading } from "@/components/Loading/redux/model";
import { Diploma } from "@/modules/diploma/redux/model";
import { Organ } from "@/modules/organ/redux/model";
import { CourseCategory } from "@/modules/course-category/redux/model";
import { Login } from "@/modules/login/redux/model";
export interface SliceModel {
	crud: Crud;
	loading: Loading;
	login: Login;
	doctor: Doctor;
	clinic: Clinic;
	drawer: BaseDrawer;
	dialog: BaseDialog;
	clinicDetail: ClinicDetail;
	diploma: Diploma;
	organ: Organ;
	courseCategory: CourseCategory;
}
