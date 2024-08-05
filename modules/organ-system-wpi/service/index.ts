import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import {
	setOrganSystemWpiForm,
	setOrganSystemWpiGrid,
} from "@/modules/organ-system-wpi/redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addOrganSystemWpiAPI,
	getOrganList,
	getOrganSystemWpiDetail,
	updateOrganSystemWpiApi,
} from "./api";
import {
	GetOrganSystemWpiList,
	OrganSystemWpi,
	OrganSystemWpiForm,
} from "@/modules/organ-system-wpi/redux/model";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";

export const fetchOrganList =
	(organ: OrganSystemWpi) => async (dispatch: AppDispatch) => {
		const body: GetOrganSystemWpiList = {
			pagination: { ...organ.grid.page },
			...organ.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getOrganList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setOrganSystemWpiGrid({
				data: result.payload.content,
				page: {
					...organ.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addOrganSystemWpi =
	(form: OrganSystemWpiForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(addOrganSystemWpiAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};

export const initOrganSystemWpiDetail =
	(params: OrganSystemWpiFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getOrganSystemWpiDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setOrganSystemWpiForm(response.payload));
		}
	};

export const updateOrganSystemWpi =
	(organSystemWpiDetail: OrganSystemWpiForm) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateOrganSystemWpiApi({
				uuid: organSystemWpiDetail.uuid,
				body: organSystemWpiDetail,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};
