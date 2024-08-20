import { BaseEntity } from "@/interfaces/baseEntity";

export interface DoctorData {
	amphur: string;
	houseNum: string;
	moo: string;
	province: string;
	road: string;
	soi: string;
	tambol: string;
	citizenId: string;
	doctorCode: string;
	doctorType: string;
	firstName: string;
	lastName: string;
	position: string;
	postalName: string;
	postcode: string;
	professionalCode: string;
	revenueNo: string;
	title: string;
	isActive: string;
	uuid: string;
}

interface Training extends BaseEntity {
	doctorCode: string;
	trainingNo: string;
	trainingTime: string;
	trainingYear: string;
	trainingDate: string;
}
interface DoctorDetail extends BaseEntity {
	doctorCode: string;
	diplomaType: string;
}

interface DoctorBank extends BaseEntity {
	doctorCode: string;
	bankAccountName: string;
	bankDigitCode: string;
	bankSortingCode: string;
	bankAccount: string;
}

interface DoctorHospital extends BaseEntity {
	doctorCode: string;
	hospitalWcfCode: string;
	jobType: string;
	clinicCode: string | null;
	position: string | null;
	hospitalWcfName: string | null;
}

export interface DoctorForm {
	doctor: DoctorData;
	doctorDetail: DoctorDetail[];
	doctorHospital: DoctorHospital[];
	doctorBank: DoctorBank[];
	training: Training[];
}

const modelDoctor: DoctorData = {
	amphur: "",
	houseNum: "",
	moo: "",
	province: "",
	road: "",
	soi: "",
	tambol: "",
	citizenId: "",
	doctorCode: "",
	doctorType: "",
	firstName: "",
	lastName: "",
	position: "",
	postalName: "",
	postcode: "",
	professionalCode: "",
	revenueNo: "",
	title: "",
	isActive: "",
	uuid: "",
};

export const modelDoctorForm: DoctorForm = {
	doctor: modelDoctor,
	doctorDetail: [],
	doctorHospital: [],
	doctorBank: [],
	training: [],
};
