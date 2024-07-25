import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addMedicalAmountAPI,
	getMedicalAmountDetail,
	getMedicalAmountList,
	updateMedicalAmountApi,
} from "./api";
import {
	setMedicalAmountForm,
	setMedicalAmountGrid,
} from "@/modules/medical-amount/redux";
import {
	MedicalAmount,
	MedicalAmountForm,
	GetMedicalAmountList,
} from "@/modules/medical-amount/redux/model";
import { setIsOpenDialog } from "@/redux/slices/dialog";

export const fetchMedicalAmountList =
	(course: MedicalAmount) => async (dispatch: AppDispatch) => {
		const body: GetMedicalAmountList = {
			...course.filter,
			...course.grid.page,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getMedicalAmountList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setMedicalAmountGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addMedicalAmount =
	(form: MedicalAmountForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(addMedicalAmountAPI(form));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};

export const initGetMedicalAmountDetail =
	(params: MedicalAmountFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getMedicalAmountDetail(`${uuid}`));
			if (_.get(response.payload, "error.message") === "Rejected") {
				return;
			}
			dispatch(setMedicalAmountForm(response.payload));
		}
	};

export const updateMedicalAmount =
	(clinicDetail: MedicalAmountForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateMedicalAmountApi({
				uuid: clinicDetail.uuid,
				body: clinicDetail,
			})
		);
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};
