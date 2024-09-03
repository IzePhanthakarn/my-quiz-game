import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAPI,
	exportExcelMed5012,
	exportMed5008Api,
	exportPdfMed5012,
	getHospitalDetail,
	getHospitalList,
	getHospitalSp7List,
	getHospitalSp7ListByHospitalUuid,
	handleUploadSp7HospitalApi,
	updateHospitalApi,
	updateHospitalSp7Api,
} from "./api";
import {
	setHospitalForm,
	setHospitalGrid,
	setHospitalSp7Grid,
} from "@/modules/hospital/redux";
import {
	Hospital,
	HospitalForm,
	GetHospitalList,
	ExportPages,
} from "@/modules/hospital/redux/model";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import type { UploadFile } from "wcf-component-lib/node_modules/antd/es/upload/interface";

// import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LINKS } from "@/constants/links";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import dayjs from "dayjs";
import { minioUploadMultiple } from "../../minio/service/api";
import { handleUploadFiles } from "wcf-component-lib/src/utils/";
import {
	GetHospitalSp7List,
	HospitalSp7,
	HospitalSp7Grid,
} from "../redux/sp7model";

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
		const data = await dispatch(
			addHospitalAPI({ hospitalCreate: form, sp7: form?.files?.sp7 })
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.INSERT_SUCCESS,
				description: "Description",
			});
			// dispatch(setIsLoading(true));
			// router.push(LINKS.HOSPITAL.link);
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

export const fetchHospitalSp7List =
	(params: HospitalFormPageProps, hospitalSp7: HospitalSp7) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const body: GetHospitalSp7List = {
				pagination: { ...hospitalSp7.grid.page },
				...hospitalSp7.filter,
				hospitalUuid: uuid,
			};
			const result = await dispatch(getHospitalSp7ListByHospitalUuid(body));
			if (_.get(result, "error.message") === "Rejected") {
				return;
			}
			// dispatch(setHospitalSp7Grid(response.payload));
			dispatch(
				setHospitalSp7Grid({
					data: result.payload.content,
					page: {
						...hospitalSp7.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);
		}
	};

export const updateHospital =
	(form: HospitalForm, router: AppRouterInstance, uuid: string) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalApi({
				uuid: uuid,
				body: { hospitalPatch: form, sp7: form?.files?.sp7 },
			})
		);
		dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			// dispatch(setIsLoading(true));
			// router.push(LINKS.HOSPITAL.link);
		}
	};

export const updateInActiveHospitalSp7 =
	(uuid: string) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalSp7Api({
				uuid: uuid,
				body: {
					isActive: "N",
				},
			})
		);
		// dispatch(setIsOpenBaseConfirmDialog(false));
		if (_.get(data, "error.message") === "Rejected") {
			return;
		} else {
			baseToastNotification({
				message: BaseToastNotificationMessage.PATCH_SUCCESS,
				description: "Description",
			});
			// dispatch(setIsLoading(true));
			// router.push(LINKS.HOSPITAL.link);
		}
	};

export const exportMed5008Function =
	(form: ExportPages["med5008"]) => async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);

		const data = await dispatch(exportMed5008Api(form));
		console.log("🚀 ~ data:", data);
	};

export const handleUploadHospital =
	(
		selectedFiles: UploadFile<any>[],
		subfolder: string,
		hospitalForm: HospitalForm
	) =>
	async (dispatch: AppDispatch) => {
		// form.setFields([
		// 	{
		// 		name: "remarkChangeName",
		// 		errors: [`กรุณาใส่ test`],
		// 	},
		// ]);
		const formData = handleUploadFiles(selectedFiles, subfolder);
		await dispatch(handleUploadSp7HospitalApi(formData));

		// dispatch(
		// 	setHospitalForm({
		// 		...hospitalForm,
		// 		files: { sp7: [] },
		// 	})
		// );
	};

export const handleOnExportExcel5012 =
	(med5012: ExportPages["med5012"]) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const result = await dispatch(exportExcelMed5012(med5012));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		const blob = new Blob([result.payload], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${dayjs().format("YYYY-MM-DD HHmmss")}.xlsx`;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
	};

export const handleOnExportPdf5012 =
	(med5012: ExportPages["med5012"], isPreview: boolean) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const result = await dispatch(exportPdfMed5012(med5012));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		const blob = new Blob([result.payload], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);
		if (isPreview) window.open(url, "_blank");
		else {
			const a = document.createElement("a");
			a.href = url;
			a.download = `${dayjs().format("YYYY-MM-DD HHmmss")}.pdf`;
			document.body.appendChild(a);
			a.click();
		}
		URL.revokeObjectURL(url);
	};
