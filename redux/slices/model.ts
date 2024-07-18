import { Crud } from "./crud/model";
import { Clinic, ClinicDetail } from "../../modules/clinic/redux/model";
import { Doctor } from "@/modules/doctor/redux/model";
import { Loading } from "@/components/Loading/redux/model";
import { Diploma } from "@/modules/diploma/redux/model";
import { OrganSystemWpi } from "@/modules/organ-system-wpi/redux/model";
import { CourseCategory } from "@/modules/course-category/redux/model";
import { Login } from "@/modules/login/redux/model";
import { BaseDrawer } from "./drawer/model";
import { BaseDialog } from "./dialog/model";
import { CourseCertificate } from "@/modules/course-certificate/redux/model";
import { CourseOrganSystemGroup } from "@/modules/course-organ-system-group/redux/model";
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
	organSystemWpi: OrganSystemWpi;
	courseCategory: CourseCategory;
	courseCertificate: CourseCertificate;
	courseOrganSystemGroup: CourseOrganSystemGroup;
}
