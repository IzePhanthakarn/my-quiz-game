import _ from "lodash";
import { setIsLoading } from "@/components/Loading/redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addCourseCertificateAPI,
	getCourseCertificateDetail,
	getCourseCertificateList,
	updateCourseCertificateApi,
} from "./api";
import {
	setCourseCertificateForm,
	setCourseCertificateGrid,
} from "@/modules/course-certificate/redux";
import {
	CourseCertificate,
	CourseCertificateForm,
	GetCourseCertificateList,
} from "@/modules/course-certificate/redux/model";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";

export const fetchCourseList =
	(course: CourseCertificate) => async (dispatch: AppDispatch) => {
		const body: GetCourseCertificateList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getCourseCertificateList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setCourseCertificateGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const addCourseCertificate =
	(form: CourseCertificateForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(addCourseCertificateAPI(form));
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};

export const initGetCourseCertificateDetail =
	(params: CourseCertificateFormPageProps) => async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getCourseCertificateDetail(`${uuid}`));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(setCourseCertificateForm(response.payload));
		}
	};

export const updateCourseCertificate =
	(clinicDetail: CourseCertificateForm) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateCourseCertificateApi({
				uuid: clinicDetail.uuid,
				body: clinicDetail,
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			dispatch(setIsOpenDialog(true));
		}
	};
