import { BaseEntity } from "@/interfaces/baseEntity";

export interface DoctorData {
	amphur: string | null;
	houseNum: string;
	moo: string;
	province: string | null;
	road: string;
	soi: string;
	tambol: string | null;
	citizenId: string;
	doctorCode: string;
	doctorType: string | null;
	firstname: string;
	lastname: string;
	// position: string;
	// postalName: string;
	postcode: string | null;
	professionalCode: string;
	revenueNo: string;
	title: string | null;
	// isActive: string;
	// uuid: string;
	categoryDescription: string | null;
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
	postalId: string;
}
interface Training extends BaseEntity {
	trainingNo: string;
	trainingTime: string;
	trainingYear: string;
	trainingDate: string;
}
interface DoctorDetail extends BaseEntity {
	diplomaType: string;
}

interface DoctorBank extends BaseEntity {
	bankAccountName: string;
	bankDigitCode: string;
	bankSortingCode: string;
	bankAccount: string;
}

interface DoctorHospital extends BaseEntity {
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
	editTimes: number[];
}

const modelDoctorData: DoctorData = {
	amphur: null,
	houseNum: "",
	moo: "",
	province: null,
	road: "",
	soi: "",
	tambol: null,
	citizenId: "",
	doctorCode: "",
	doctorType: null,
	firstname: "",
	lastname: "",
	// position: "",
	// postalName: "",
	postcode: null,
	professionalCode: "",
	revenueNo: "",
	title: null,
	// isActive: "",
	// uuid: "",
	categoryDescription: null,
};

export const modelDoctorForm: DoctorForm = {
	doctorData: modelDoctorData,
	doctorDetail: [],
	doctorHospital: [],
	doctorBank: [],
	doctorTraining: [],
	doctorPostal: [],
	editTimes: [],
};
