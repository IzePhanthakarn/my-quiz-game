export interface DoctorForm {
	doctorId: number;
	createdBy: string;
	createdDate: string;
	updatedBy: string;
	updatedDate: string;
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

interface DoctorDetail {}

export const modelDoctorForm: DoctorForm = {
	doctorId: 0,
	createdBy: "",
	createdDate: "",
	updatedBy: "",
	updatedDate: "",
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
