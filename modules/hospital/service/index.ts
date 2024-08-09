import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAPI,
	getHospitalDetail,
	getHospitalList,
	updateHospitalApi,
} from "./api";
import { setHospitalForm, setHospitalGrid } from "@/modules/hospital/redux";
import {
	Hospital,
	HospitalForm,
	GetHospitalList,
} from "@/modules/hospital/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LINKS } from "@/constants/links";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";

export const fetchHospitalList =
	(course: Hospital) => async (dispatch: AppDispatch) => {
		const body: GetHospitalList = {
			pagination: { ...course.grid.page },
			...course.filter,
			hospitalWcfCodeLike: _.isEmpty(course.filter.hospitalWcfCodeLike)
				? null
				: course.filter.hospitalWcfCodeLike,
			hospitalDbmsCodeLike: _.isEmpty(course.filter.hospitalDbmsCodeLike)
				? null
				: course.filter.hospitalDbmsCodeLike,
			hospitalMinistryCodeLike: _.isEmpty(
				course.filter.hospitalMinistryCodeLike
			)
				? null
				: course.filter.hospitalMinistryCodeLike,
			hospitalNameLike: _.isEmpty(course.filter.hospitalNameLike)
				? null
				: course.filter.hospitalNameLike,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getHospitalList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setHospitalGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addHospital =
	(form: HospitalForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(addHospitalAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.HOSPITAL.link);
		}
	};

export const initGetHospitalDetail =
	(params: HospitalFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getHospitalDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setHospitalForm(response.payload));
		}
	};

export const updateHospital =
	(form: HospitalForm, router: AppRouterInstance) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalApi({
				uuid: form.uuid,
				body: form,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data.payload, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			dispatch(setIsLoading(true));
			router.push(LINKS.HOSPITAL.link);
		}
	};
