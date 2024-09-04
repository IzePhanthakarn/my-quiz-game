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

export interface TrainingList extends Training {
	id: number;
}

export interface DoctorDetailList extends DoctorDetail {
	id: number;
}

export interface DoctorHospitalList extends DoctorHospital {
	id: number;
}

export interface DoctorBankList extends DoctorBank {
	id: number;
}

export interface DoctorPostalList extends DoctorPostal {
	id: number;
}

interface DoctorPostal extends BaseEntity {
	doctorCode: string;
	postalId: string;
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
	doctorData: DoctorData;
	doctorDetail: DoctorDetailList[];
	doctorHospital: DoctorHospitalList[];
	doctorBank: DoctorBankList[];
	doctorTraining: TrainingList[];
	doctorPostal: DoctorPostalList[];
	[key: string]:
		| DoctorData
		| DoctorDetailList[]
		| DoctorHospitalList[]
		| DoctorBankList[]
		| TrainingList[]
		| DoctorPostalList[];
}

const modelDoctorData: DoctorData = {
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
	doctorData: modelDoctorData,
	doctorDetail: [],
	doctorHospital: [],
	doctorBank: [],
	doctorTraining: [],
	doctorPostal: [],
};
