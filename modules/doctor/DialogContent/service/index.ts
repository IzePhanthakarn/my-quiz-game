import { AppDispatch } from "@/redux/config/configStore";
import {
	DoctorBankList,
	DoctorDetailList,
	DoctorHospitalList,
	DoctorPostalList,
	TrainingList,
} from "../../redux/form/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { mapIdByIndex } from "@/utils";
import _ from "lodash";
import {
	setDoctorBankList,
	setDoctorDetailList,
	setDoctorHospitalList,
	setDoctorPostalList,
	setTrainingList,
} from "../../redux";
import { DoctorHospital } from "wcf-component-lib/src/components/BaseDropDown/model";
import { TraningState } from "../TrainingDialog";
import { Bank } from "../BankDialog";

export const handleDoctorDetailRows =
	(params: {
		diplomaType?: string;
		doctorDetailGrid: DoctorDetailList[];
		editId?: number;
		isDelete?: boolean;
		uuid?: string | null;
	}) =>
	async (dispatch: AppDispatch) => {
		const { diplomaType = "", doctorDetailGrid, editId, isDelete } = params;
		const newDoctorDetail: DoctorDetailList = {
			id: 0,
			diplomaType: diplomaType,
			uuid: null,
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
		};

		const newGrid = _.cloneDeep(doctorDetailGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newDoctorDetail, id: editId };
		} else newGrid.push(newDoctorDetail);
		dispatch(setDoctorDetailList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};

export const handleHospitalRows =
	(params: {
		hospital?: DoctorHospital;
		doctorHospitalGrid: DoctorHospitalList[];
		editId?: number;
		isDelete?: boolean;
	}) =>
	async (dispatch: AppDispatch) => {
		const { doctorHospitalGrid, editId, isDelete, hospital } = params;

		const newDoctorHospital: DoctorHospitalList = {
			id: 0,
			hospitalWcfCode: hospital?.hospitalWcfCode ?? "",
			jobType: hospital?.jobType ?? "",
			clinicCode: null,
			position: hospital?.position ?? "",
			hospitalWcfName: hospital?.hospitalName ?? "",
			uuid: null,
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
		};

		const newGrid = _.cloneDeep(doctorHospitalGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newDoctorHospital, id: editId };
		} else newGrid.push(newDoctorHospital);
		dispatch(setDoctorHospitalList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};

export const handleTrainingRows =
	(params: {
		training?: TraningState;
		trainingGrid: TrainingList[];
		editId?: number;
		isDelete?: boolean;
	}) =>
	async (dispatch: AppDispatch) => {
		const { trainingGrid, editId, isDelete, training } = params;

		const year = (training?.trainingDate ?? "").split("-")[0];

		const newTraining: TrainingList = {
			id: 0,
			uuid: null,
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
			trainingNo: training?.trainingNo ?? "",
			trainingTime: "",
			trainingYear: year,
			trainingDate: `${training?.trainingDate ?? ""}T00:00:00`,
		};

		const newGrid = _.cloneDeep(trainingGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newTraining, id: editId };
		} else newGrid.push(newTraining);
		dispatch(setTrainingList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};

export const handleHospital = (
	hospital: DoctorHospital,
	setHospital: (hospital: DoctorHospital) => void
) => {
	if (_.isEmpty(hospital.hospitalName)) {
		const raw_hospital = JSON.parse(sessionStorage.getItem("HOSPITAL") ?? "[]");
		const name = raw_hospital.find(
			(e: DoctorHospital) => e.hospitalWcfCode === hospital.hospitalWcfCode
		);
		setHospital({ ...hospital, hospitalName: name.hospitalName });
	}
	return `${hospital.hospitalWcfCode}-${hospital.hospitalName}`;
};

export const handleBankRows =
	(params: {
		bank?: Bank;
		doctorBankGrid: DoctorBankList[];
		editId?: number;
		isDelete?: boolean;
	}) =>
	async (dispatch: AppDispatch) => {
		const { bank, doctorBankGrid, editId, isDelete } = params;
		const newDoctorDetail: DoctorBankList = {
			id: 0,
			uuid: null,
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
			bankAccountName: bank?.bankAccountName ?? "",
			bankDigitCode: bank?.bankDigitCode ?? "",
			bankSortingCode: bank?.bankSortingCode ?? "",
			bankAccount: bank?.bankAccount ?? "",
		};

		const newGrid = _.cloneDeep(doctorBankGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newDoctorDetail, id: editId };
		} else newGrid.push(newDoctorDetail);
		dispatch(setDoctorBankList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};

export const handlePostalRows =
	(params: {
		postalId?: string;
		doctorPostalGrid: DoctorPostalList[];
		editId?: number;
		isDelete?: boolean;
	}) =>
	async (dispatch: AppDispatch) => {
		const { postalId = "", doctorPostalGrid, editId, isDelete } = params;
		const newDoctorDetail: DoctorPostalList = {
			id: 0,
			uuid: null,
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
			postalId: postalId,
		};

		const newGrid = _.cloneDeep(doctorPostalGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newDoctorDetail, id: editId };
		} else newGrid.push(newDoctorDetail);
		dispatch(setDoctorPostalList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};
