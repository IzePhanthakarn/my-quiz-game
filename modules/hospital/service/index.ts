import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import {
	addHospitalAPI,
	exportMed5008Api,
	getHospitalAnnouncedPriceFilesListByHospitalUuid,
	getHospitalAttachmentListByHospitalWcfCodeAndFieldName,
	getHospitalDetail,
	getHospitalEtcFilesListByHospitalUuid,
	getHospitalList,
	getHospitalSp19ListByHospitalUuid,
	getHospitalSp7List,
	getHospitalSp7ListByHospitalUuid,
	handleUploadSp7HospitalApi,
	updateHospitalAnnouncedPriceFilesApi,
	updateHospitalApi,
	updateHospitalEtcFilesApi,
	updateHospitalSp19Api,
	updateHospitalSp7Api,
} from "./api";
import {
	setHospitalCertificateOfIncorporationAttachmentGrid,
	setHospitalAttachmentFile1Grid,
	setHospitalEtcFilesGrid,
	setHospitalForm,
	setHospitalGrid,
	setHospitalSp19Grid,
	setHospitalSp7Grid,
	setHospitalAttachmentFile1ToPreview,
	setHospitalCertificateOfIncorporationAttachmentToPreview,
	setHospitalAnnouncedPriceFilesGrid,
} from "@/modules/hospital/redux";
import {
	Hospital,
	HospitalForm,
	GetHospitalList,
	ExportPages,
	OutsideHospitalForm,
} from "@/modules/hospital/redux/models/hospitalModel";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import type { UploadFile } from "wcf-component-lib/node_modules/antd/es/upload/interface";
// import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
import { BaseToastNotificationMessage } from "wcf-component-lib/src/constants/base-toast-notification";
import {
	handleFormatDate,
	handleUploadFiles,
} from "wcf-component-lib/src/utils/";
import {
	GetHospitalSp7List,
	HospitalSp7,
	HospitalSp7Grid,
} from "@/modules/hospital/redux/models/sp7Model";
import {
	GetHospitalSp19List,
	HospitalSp19,
	HospitalSp19Grid,
} from "@/modules/hospital/redux/models/sp19Model";
import {
	GetHospitalEtcFilesList,
	HospitalEtcFiles,
} from "../redux/models/etcFilesModel";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	GetHospitalAttachmentList,
	HospitalAttachment,
	HospitalAttachmentGridData,
	modelHospitalAttachment,
} from "../redux/models/attachmentModel";
import {
	GetHospitalAnnouncedPriceFilesList,
	HospitalAnnouncedPriceFiles,
} from "../redux/models/announcedPriceFilesModel";

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
	(
		form: HospitalForm,
		outsideHospitalForm: OutsideHospitalForm,
		router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			addHospitalAPI({
				hospitalCreate: form,
				sp7: form?.files?.sp7,
				sp19: form?.files?.sp19,
				etcFiles: form?.files?.etcFiles,
				certificateOfIncorporation: form?.files?.certificateOfIncorporation,
				attachmentFile1: form?.files?.attachmentFile1,
				outsideHospitalForm: outsideHospitalForm,
			})
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

			dispatch(
				fetchHospitalAttachmentList(
					response.payload,
					modelHospitalAttachment,
					"CertificateOfIncorporation"
				)
			);

			dispatch(
				fetchHospitalAttachmentList(
					response.payload,
					modelHospitalAttachment,
					"AttachmentFile1"
				)
			);
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
				isActive: IsActive.Y,
			};
			const result = await dispatch(getHospitalSp7ListByHospitalUuid(body));
			if (_.get(result, "error.message") === "Rejected") {
				return;
			}
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

export const fetchHospitalSp19List =
	(params: HospitalFormPageProps, hospitalSp19: HospitalSp19) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const body: GetHospitalSp19List = {
				pagination: { ...hospitalSp19.grid.page },
				...hospitalSp19.filter,
				hospitalUuid: uuid,
				isActive: IsActive.Y,
			};
			const result = await dispatch(getHospitalSp19ListByHospitalUuid(body));
			if (_.get(result, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalSp19Grid({
					data: result.payload.content,
					page: {
						...hospitalSp19.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);
		}
	};

export const fetchHospitalEtcFilesList =
	(params: HospitalFormPageProps, hospitalEtcFiles: HospitalEtcFiles) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const body: GetHospitalEtcFilesList = {
				pagination: { ...hospitalEtcFiles.grid.page },
				...hospitalEtcFiles.filter,
				hospitalUuid: uuid,
				isActive: IsActive.Y,
			};
			const result = await dispatch(
				getHospitalEtcFilesListByHospitalUuid(body)
			);
			if (_.get(result, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalEtcFilesGrid({
					data: result.payload.content,
					page: {
						...hospitalEtcFiles.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);
		}
	};

export const fetchHospitalAnnouncedPriceFilesList =
	(
		params: HospitalFormPageProps,
		hospitalAnnouncedPriceFiles: HospitalAnnouncedPriceFiles
	) =>
	async (dispatch: AppDispatch) => {
		const { uuid } = params.params;
		if (!_.isEmpty(uuid)) {
			const body: GetHospitalAnnouncedPriceFilesList = {
				pagination: { ...hospitalAnnouncedPriceFiles.grid.page },
				...hospitalAnnouncedPriceFiles.filter,
				hospitalUuid: uuid,
				isActive: IsActive.Y,
			};
			const result = await dispatch(
				getHospitalAnnouncedPriceFilesListByHospitalUuid(body)
			);
			if (_.get(result, "error.message") === "Rejected") {
				return;
			}
			const newData = [];
			for (let index = 0; index < result.payload.content.length; index++) {
				const item = result.payload.content[index];
				newData.push({
					...item,
					createdDate: handleFormatDate(item.createdDate),
					updatedDate: handleFormatDate(item.updatedDate),
				});
			}
			dispatch(
				setHospitalAnnouncedPriceFilesGrid({
					// data: result.payload.content,
					data: newData,
					page: {
						...hospitalAnnouncedPriceFiles.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);
		}
	};

export const fetchHospitalAttachmentList =
	(
		form: HospitalForm,
		hospitalAttachment: HospitalAttachment,
		fieldName: "CertificateOfIncorporation" | "AttachmentFile1"
	) =>
	async (dispatch: AppDispatch) => {
		const body: GetHospitalAttachmentList = {
			pagination: { ...hospitalAttachment.grid.page },
			...hospitalAttachment.filter,
			hospitalWcfCode: form.hospitalWcfCode,
			isActive: IsActive.Y,
			fieldName: fieldName,
		};
		const result = await dispatch(
			getHospitalAttachmentListByHospitalWcfCodeAndFieldName(body)
		);
		if (_.get(result, "error.message") === "Rejected") {
			return;
		}
		if (fieldName === "CertificateOfIncorporation") {
			await dispatch(
				setHospitalCertificateOfIncorporationAttachmentGrid({
					data: result.payload.content,
					page: {
						...hospitalAttachment.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);
			await dispatch(
				setHospitalCertificateOfIncorporationAttachmentToPreview(
					convertAttachmentFileToPreview(
						result.payload.content,
						"certificateOfIncorporation"
					)
				)
			);
		} else if (fieldName === "AttachmentFile1") {
			await dispatch(
				setHospitalAttachmentFile1Grid({
					data: result.payload.content,
					page: {
						...hospitalAttachment.grid.page,
						totalData: result.payload.totalElements,
					},
				})
			);

			await dispatch(
				setHospitalAttachmentFile1ToPreview(
					convertAttachmentFileToPreview(
						result.payload.content,
						"attachmentFile1"
					)
				)
			);
		}
	};

export const convertAttachmentFileToPreview = (
	items: HospitalAttachmentGridData[],
	subFolder: string
) => {
	const toPreview: HospitalAttachment["toPreview"] = [];
	for (let index = 0; index < items.length; index++) {
		const item: HospitalAttachmentGridData = items[index];
		toPreview.push({
			uid: item.uuid,
			name: `${item.attachmentName}.${item.extension}`,
			// status: "done",
			url: `https://minio-wcf.soilfish.co/wcf2-public/hospital/${subFolder}/${item.attachmentName}.${item.extension}`,
			type: item.extension,
		});
	}
	return toPreview;
};

export const updateHospital =
	(
		form: HospitalForm,
		outsideHospitalForm: OutsideHospitalForm,
		router: AppRouterInstance,
		uuid: string
	) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalApi({
				uuid: uuid,
				body: {
					hospitalPatch: form,
					sp7: form?.files?.sp7,
					sp19: form?.files?.sp19,
					etcFiles: form?.files?.etcFiles,
					certificateOfIncorporation: form?.files?.certificateOfIncorporation,
					attachmentFile1: form?.files?.attachmentFile1,
					announcedPriceFiles: form?.files?.announcedPriceFiles,
					outsideHospitalForm: outsideHospitalForm,
				},
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

export const updateInActiveHospitalSp19 =
	(uuid: string) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalSp19Api({
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

export const updateInActiveHospitalEtcFiles =
	(uuid: string) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalEtcFilesApi({
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

export const updateInActiveHospitalAnnouncedPriceFiles =
	(uuid: string) => async (dispatch: AppDispatch) => {
		const data = await dispatch(
			updateHospitalAnnouncedPriceFilesApi({
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
