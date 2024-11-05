"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BasePreviewPicture from "wcf-component-lib/src/components/BasePreviewPicture";
import UserAddOutlined from "wcf-component-lib/node_modules/@ant-design/icons/UserAddOutlined";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import {
	setDialog,
	setIsOpenBaseConfirmDialog,
	setOnConfirmDialog,
} from "@/redux/slices/dialog";
import { ADDRESS, IsActive } from "wcf-component-lib/src/constants/constants";
import {
	setHospitalAnnouncedPriceFiles,
	setHospitalAttachmentFile1,
	setHospitalAttachmentFile1ToPreview,
	setHospitalCertificateOfIncorporationAttachment,
	setHospitalCertificateOfIncorporationAttachmentToPreview,
	setHospitalEtcFiles,
	setHospitalForm,
	setHospitalSp19,
	setHospitalSp7,
	setHospitalStaffContact,
	setOutsideHospitalForm,
} from "./redux";
import { HospitalForm, modelHospital } from "./redux/models/hospitalModel";
import {
	addHospital,
	fetchHospitalAnnouncedPriceFilesList,
	fetchHospitalEtcFilesList,
	fetchHospitalSp19List,
	fetchHospitalSp7List,
	fetchHospitalStaffContactList,
	initGetHospitalDetail,
	updateHospital,
} from "./service";
import { rules } from "@/modules/hospital/field-validation/FormValidation";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/HomeFilled";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import BaseCollapseLabelHeader from "wcf-component-lib/src/components/BaseCollapseLabelHeader";
import BaseButtonCancel from "wcf-component-lib/src/components/BaseButtonCancel";
import BaseButtonDraft from "wcf-component-lib/src/components/BaseButtonDraft";
import BaseButtonSave from "wcf-component-lib/src/components/BaseButtonSave";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { names } from "./interfaces/names";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import BaseHeaderNameAndSwitch from "wcf-component-lib/src/components/BaseHeaderNameAndSwitch/BaseHeaderNameAndSwitch";
import BaseUploadDraggerHospital from "wcf-component-lib/src/components/BaseUploadDraggerHospital";
// import { setMultipleFiles } from "../minio/redux";
import { FILE_TYPES } from "wcf-component-lib/src/constants/file-types";

import BaseGreenHeader from "wcf-component-lib/src/components/BaseGreenHeader";

import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Sp7Grid } from "./columns/sp7Grid";
import { HospitalStaffContactGrid } from "./columns/hospitalStaffContactGrid";

import API_PATH from "@/constants/api";
// import Cookies from "wcf-component-lib/node_modules/@types/js-cookie/index";
import Cookies from "js-cookie";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import MedDropDown from "@/components/MedDropDown";
import { Sp19Grid } from "./columns/sp19Grid";
import { EtcFilesGrid } from "./columns/etcFilesGrid";
import { AnnouncedPriceFilesGrid } from "./columns/hospitalAnnouncedPriceGrid";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { getCurrentYearString } from "wcf-component-lib/src/utils";
import { Address } from "wcf-component-lib/src/components/BaseDropDown/model";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { modelDialog } from "@/redux/slices/dialog/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import AddHospitalStaffContactForm from "./Form/SubForm/addHospitalStaffContactForm";
import { modelHospitalStaffContact } from "./redux/models/hospitalStaffContactModel";
import HospitalHistory from "./Form/History/hospitalHistory";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import DivPermission from "wcf-component-lib/src/components/BaseDivPermission";
dayjs.extend(localeData);

const yearOption: {
	label: string;
	value: string;
}[] = [];
for (
	let start = parseInt(getCurrentYearString()) - 10;
	start <= parseInt(getCurrentYearString()) + 2;
	start++
) {
	yearOption.push({ label: `${start}`, value: `${start}` });
}

const HospitalFormPage = (params: HospitalFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const [form] = Form.useForm<HospitalForm>();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const {
		hospitalForm,
		onConfirm,
		isOpenBaseConfirmDialog,
		files,
		hospitalSp7,
		hospitalSp19,
		hospitalEtcFiles,
		hospitalCertificateOfIncorporationAttachment,
		hospitalAttachmentFile1,
		hospitalAnnouncedPriceFiles,
		isLoading,
		outsideHospitalForm,
		dialog,
		hospitalStaffContact,
	} = useSelector(
		(state: SliceModel) => ({
			dialog: state.dialog,
			onConfirm: state.dialog.onConfirm,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			hospitalForm: state.hospital.form,
			hospitalSp7: state.hospital.hospitalSp7,
			hospitalSp19: state.hospital.hospitalSp19,
			hospitalEtcFiles: state.hospital.hospitalEtcFiles,
			hospitalAnnouncedPriceFiles: state.hospital.hospitalAnnouncedPriceFiles,
			hospitalStaffContact: state.hospital.hospitalStaffContact,
			hospitalCertificateOfIncorporationAttachment:
				state.hospital.hospitalCertificateOfIncorporationAttachment,
			hospitalAttachmentFile1: state.hospital.hospitalAttachmentFile1,
			files: state.hospital.form.files,
			isLoading: state.container.isLoading,
			outsideHospitalForm: state.hospital.outsideHospitalForm,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetHospitalDetail(params));
					await dispatch(
						fetchHospitalSp7List(params, modelHospital.hospitalSp7)
					);
					await dispatch(
						fetchHospitalSp19List(params, modelHospital.hospitalSp19)
					);
					await dispatch(
						fetchHospitalEtcFilesList(params, modelHospital.hospitalEtcFiles)
					);
					await dispatch(
						fetchHospitalAnnouncedPriceFilesList(
							params,
							hospitalAnnouncedPriceFiles
						)
					);
					await dispatch(
						fetchHospitalStaffContactList(params, hospitalStaffContact)
					);
				} else {
					dispatch(setHospitalForm(modelHospital.form));
					dispatch(setHospitalSp7(modelHospital.hospitalSp7));
					dispatch(setHospitalSp19(modelHospital.hospitalSp19));
					dispatch(setHospitalEtcFiles(modelHospital.hospitalEtcFiles));
					dispatch(
						setHospitalAnnouncedPriceFiles(
							modelHospital.hospitalAnnouncedPriceFiles
						)
					);
					dispatch(
						setHospitalCertificateOfIncorporationAttachment(
							modelHospital.hospitalCertificateOfIncorporationAttachment
						)
					);
					dispatch(
						setHospitalAttachmentFile1(modelHospital.hospitalAttachmentFile1)
					);
					dispatch(setHospitalStaffContact(modelHospital.hospitalStaffContact));
				}

				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalForm>["onFinish"] = async () => {
		if (
			!_.isEmpty(form.getFieldsValue().contractEndDate) &&
			_.isEmpty(form.getFieldsValue().remarkChangeName)
		) {
			form.setFields([
				{
					name: "remarkChangeName" as const,
					errors: [`กรุณาใส่ ${names.remarkChangeName}`],
				},
			]);
			return;
		}

		if (files?.sp7?.length) {
			const errorArray = [];
			errorArray.push({
				name: "sp7StartDated" as const, // ใช้ `as const` เพื่อกำหนดให้เป็น literal type ที่ตรงกับ `HospitalForm`
				errors: _.isEmpty(form.getFieldsValue().sp7StartDated)
					? [`กรุณาใส่ ${names.sp7StartDated}`]
					: undefined,
			});

			errorArray.push({
				name: "sp7EndDate" as const, // ใช้ `as const` เช่นเดียวกัน
				errors: _.isEmpty(form.getFieldsValue().sp7EndDate)
					? [`กรุณาใส่ ${names.sp7EndDate}`]
					: undefined,
			});
			form.setFields(errorArray);

			/**
			 * เงื่อนไข checkCondition คือตรวจสอบว่าทุก errors key ใน errorArray เป็น Undefined หรือไม่
			 * ถ้าใช่จะ return true
			 * */
			const checkCondition = _.every(errorArray, (obj) => {
				return _.isUndefined(obj.errors);
			});

			// /**
			//  * จาก checkCondition ด้านบน จะ return true หาก errors key ทุกตัวเป็น undefined
			//  * แต่ต้องการเช็คเงื่อนไขว่า ถ้าทุกตัว "ไม่ใช่" undefined จึงจะทำเงื่อนไขใดๆ
			//  */
			if (!checkCondition) {
				return;
			}
			// if (checkCondition) {
			// await dispatch(
			// 	handleUploadHospital(files.sp7, "hospital/sp7", hospitalForm)
			// );

			// dispatch(
			// 	setHospitalForm({
			// 		...hospitalForm,
			// 		files: { sp7: [] },
			// 	})
			// );
			// } else {
			// return;

			// }
		}

		if (files?.sp19?.length) {
			const errorArray = [];
			errorArray.push({
				name: "sp19StartDate" as const,
				errors: _.isEmpty(form.getFieldsValue().sp19StartDate)
					? [`กรุณาใส่ ${names.sp19StartDate}`]
					: undefined,
			});
			errorArray.push({
				name: "sp19EndDate" as const,
				errors: _.isEmpty(form.getFieldsValue().sp19EndDate)
					? [`กรุณาใส่ ${names.sp19EndDate}`]
					: undefined,
			});
			form.setFields(errorArray);

			/**
			 * เงื่อนไข checkCondition คือตรวจสอบว่าทุก errors key ใน errorArray เป็น Undefined หรือไม่
			 * ถ้าใช่จะ return true
			 * */
			const checkCondition = _.every(errorArray, (obj) => {
				return _.isUndefined(obj.errors);
			});

			// /**
			//  * จาก checkCondition ด้านบน จะ return true หาก errors key ทุกตัวเป็น undefined
			//  * แต่ต้องการเช็คเงื่อนไขว่า ถ้าทุกตัว "ไม่ใช่" undefined จึงจะทำเงื่อนไขใดๆ
			//  */
			if (!checkCondition) {
				return;
			}
			// if (checkCondition) {
			// await dispatch(
			// 	handleUploadHospital(files.sp19, "hospital/sp19", hospitalForm)
			// );

			// dispatch(
			// 	setHospitalForm({
			// 		...hospitalForm,
			// 		files: { sp19: [] },
			// 	})
			// );
			// } else {
			// return;

			// }
		}

		// if (files?.announcedPriceFiles?.length) {
		// 	const errorArray = [];
		// 	errorArray.push({
		// 		name: "announcedPriceYear",
		// 		errors: _.isEmpty(form.getFieldsValue().announcedPriceYear)
		// 			? [`กรุณาใส่ ${names.announcedPriceYear}`]
		// 			: undefined,
		// 	});

		// 	form.setFields(errorArray);
		// 	/**
		// 	 * เงื่อนไข checkCondition คือตรวจสอบว่าทุก errors key ใน errorArray เป็น Undefined หรือไม่
		// 	 * ถ้าใช่จะ return true
		// 	 * */
		// 	const checkCondition = _.every(errorArray, (obj) => {
		// 		return _.isUndefined(obj.errors);
		// 	});
		// 	// /**
		// 	//  * จาก checkCondition ด้านบน จะ return true หาก errors key ทุกตัวเป็น undefined
		// 	//  * แต่ต้องการเช็คเงื่อนไขว่า ถ้าทุกตัว "ไม่ใช่" undefined จึงจะทำเงื่อนไขใดๆ
		// 	//  */
		// 	if (!checkCondition) {
		// 		return;
		// 	}
		// }

		dispatch(
			setDialog({
				...dialog,
				async onConfirm() {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(
							updateHospital(
								hospitalForm,
								outsideHospitalForm,
								router,
								`${params.params.uuid}`,
								hospitalSp7,
								hospitalAnnouncedPriceFiles,
								hospitalSp19,
								hospitalEtcFiles,
								hospitalStaffContact,
								hospitalAttachmentFile1,
								hospitalCertificateOfIncorporationAttachment
							)
						);
					} else {
						dispatch(addHospital(hospitalForm, outsideHospitalForm, router));
					}
				},
				isOpenBaseConfirmDialog: true,
				content: "หลังจากบันทึก ระบบจะสร้างเลขที่ประสบอันตราย",
				headerText: "คุณต้องการบันทึกใช่หรือไม่",
			})
		);
	};

	const onFinishFailed: FormProps<HospitalForm>["onFinishFailed"] = (_) => {};

	const scopes = [
		"location:read",
		"location:write",
		"resource:read",
		"resource:write",
		"netdb:select",
		"netdb:update",
		"changs-req:read",
		"changs-req:write",
	];

	const resourceScopes = findScope(scopes, "resource:");
	const { write } = getScopesPermissions(resourceScopes);

	const uploadFilesSection: CollapseProps["items"] = [
		{
			key: "5",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อตกลงระหว่างสำนักงานกองทุนเงินทดแทนกับสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดกองทุนเงินทดแทนสำหรับสถานพยาบาล"
				/>
			),
			children: (
				<>
					<BaseHorizontalHeader
						title={"ข้อตกลงระหว่างสำนักงานกองทุนเงินทดแทนกับสถานพยาบาล"}
						icons={<HomeFilled />}
						className="mb-4"
					/>
					<div
						className={`mb-5 ${
							hospitalAttachmentFile1.toPreview.length === 0 && "hidden"
						}`}
					>
						<BasePreviewPicture
							subFolderPath="hospital/attachmentFile1"
							items={hospitalAttachmentFile1.toPreview}
							onChangeFunction={(e) => {
								dispatch(setHospitalAttachmentFile1ToPreview(e));
							}}
						/>
					</div>
					<div
						className={`mb-5 ${
							hospitalAttachmentFile1.toPreview.length !== 0 && "hidden"
						}`}
					>
						<BaseUploadDraggerHospital
							allowFileTypesToUpload={[FILE_TYPES.PDF]}
							reset={hospitalAttachmentFile1.toPreview.length === 0 && true}
							showUploadList={false}
							className={`style1`}
							uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
							subFolderPath="hospital/attachmentFile1"
							bearer={`${Cookies.get("accessToken")}`}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										files: {
											...hospitalForm.files,
											attachmentFile1: e,
										},
									})
								);
								dispatch(setHospitalAttachmentFile1ToPreview(e));
							}}
						/>
					</div>

					<BaseHorizontalHeader
						title={"สพ7"}
						icons={<HomeFilled />}
						className="mb-7"
					/>
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-8 ">
							<BaseGrid
								rows={hospitalSp7.grid.data}
								columns={Sp7Grid({
									hospitalSp7: hospitalSp7,
									dispatch: dispatch,
									params: params,
									dialog: dialog,
								})}
								page={hospitalSp7.grid.page}
								loading={isLoading}
								twoToneColor={true}
								setPagination={(page) => {
									dispatch(
										fetchHospitalSp7List(params, {
											...hospitalSp7,
											grid: { ...hospitalSp7.grid, page },
										})
									);
								}}
							/>
						</div>
						<div className="col-span-4 ">
							<BaseGreenHeader
								title="อัพโหลดเอกสาร สพ7"
								description="เอกสาร สพ7"
								className="mb-7"
							/>
							<div className="grid gap-x-4 gap-y-2 grid-cols-2 mb-6 px-6">
								<BaseDatePicker
									pageLevel="edit"
									label={names.sp7StartDated}
									itemName="sp7StartDated"
									rules={rules.sp7StartDatedSchema}
									value={hospitalForm.sp7StartDated}
									onChangeDateFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												sp7StartDated: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									pageLevel="edit"
									label={names.sp7EndDate}
									itemName="sp7EndDate"
									rules={rules.sp7EndDateSchema}
									value={hospitalForm.sp7EndDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												sp7EndDate: e,
											})
										);
									}}
								/>
							</div>
							<div>
								<BaseUploadDraggerHospital
									className="style2"
									allowFileTypesToUpload={[FILE_TYPES.PDF]}
									// backgroundColor="BBC8CB"
									uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
									subFolderPath="hospital/sp7"
									bearer={`${Cookies.get("accessToken")}`}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												files: { ...hospitalForm.files, sp7: e },
											})
										);
									}}
								/>
							</div>
						</div>
					</div>
					<BaseHorizontalHeader
						title={"สพ19"}
						icons={<HomeFilled />}
						className="mb-7"
					/>

					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-8 ">
							<BaseGrid
								rows={hospitalSp19.grid.data}
								columns={Sp19Grid({
									hospitalSp19: hospitalSp19,
									dispatch: dispatch,
									params: params,
									dialog: dialog,
								})}
								page={hospitalSp19.grid.page}
								loading={isLoading}
								twoToneColor={true}
								setPagination={(page) => {
									dispatch(
										fetchHospitalSp19List(params, {
											...hospitalSp19,
											grid: { ...hospitalSp19.grid, page },
										})
									);
								}}
							/>
						</div>
						<div className="col-span-4 ">
							<BaseGreenHeader
								title="อัพโหลดเอกสาร สพ19"
								description="เอกสาร สพ19"
								className="mb-7"
							/>
							<div className="grid gap-x-4 gap-y-2 grid-cols-2 mb-6 px-6">
								<BaseDatePicker
									pageLevel="edit"
									label={names.sp19StartDate}
									itemName="sp19StartDate"
									rules={rules.sp19StartDateSchema}
									value={hospitalForm.sp19StartDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												sp19StartDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp19EndDate}
									pageLevel="edit"
									itemName="sp19EndDate"
									rules={rules.sp19EndDateSchema}
									value={hospitalForm.sp19EndDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												sp19EndDate: e,
											})
										);
									}}
								/>
							</div>
							<div>
								<BaseUploadDraggerHospital
									className="style2"
									allowFileTypesToUpload={[FILE_TYPES.PDF]}
									uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
									subFolderPath="hospital/sp19"
									bearer={`${Cookies.get("accessToken")}`}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												files: { ...hospitalForm.files, sp19: e },
											})
										);
									}}
								/>
							</div>
						</div>
					</div>

					<BaseHorizontalHeader
						title={"หนังสือรับรองนิติบุคคล"}
						icons={<HomeFilled />}
						className="mb-4"
					/>

					<div
						className={`mb-5 ${
							hospitalCertificateOfIncorporationAttachment.toPreview.length ===
								0 && "hidden"
						}`}
					>
						<BasePreviewPicture
							subFolderPath="hospital/certificateOfIncorporation"
							isHidden={
								hospitalCertificateOfIncorporationAttachment.toPreview
									.length === 0 && true
							}
							items={hospitalCertificateOfIncorporationAttachment.toPreview}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalCertificateOfIncorporationAttachmentToPreview(e)
								);
							}}
						/>
					</div>
					<div
						className={`mb-5 ${
							hospitalCertificateOfIncorporationAttachment.toPreview.length !==
								0 && "hidden"
						}`}
					>
						<BaseUploadDraggerHospital
							reset={
								hospitalCertificateOfIncorporationAttachment.toPreview
									.length === 0 && true
							}
							allowFileTypesToUpload={[FILE_TYPES.PDF]}
							showUploadList={false}
							className={`style1`}
							uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
							subFolderPath="hospital/certificateOfIncorporation"
							bearer={`${Cookies.get("accessToken")}`}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										files: {
											...hospitalForm.files,
											certificateOfIncorporation: e,
										},
									})
								);
								dispatch(
									setHospitalCertificateOfIncorporationAttachmentToPreview(e)
								);
							}}
						/>
					</div>

					<BaseHorizontalHeader
						title={"ภาคผนวกและอื่น ๆ"}
						icons={<HomeFilled />}
						className="mb-7"
					/>

					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-8 ">
							<BaseGrid
								rows={hospitalEtcFiles.grid.data}
								columns={EtcFilesGrid({
									hospitalEtcFiles: hospitalEtcFiles,
									dispatch: dispatch,
									params: params,
									dialog: dialog,
								})}
								page={hospitalEtcFiles.grid.page}
								loading={isLoading}
								twoToneColor={true}
								setPagination={(page) => {
									dispatch(
										fetchHospitalEtcFilesList(params, {
											...hospitalEtcFiles,
											grid: { ...hospitalEtcFiles.grid, page },
										})
									);
								}}
							/>
						</div>
						<div className="col-span-4 ">
							<BaseGreenHeader
								title="อัพโหลดเอกสาร ภาคผนวกและอื่น ๆ"
								description="เอกสาร ภาคผนวกและอื่น ๆ"
								className=""
							/>
							<div>
								<BaseUploadDraggerHospital
									allowFileTypesToUpload={[FILE_TYPES.PDF]}
									className="style2"
									uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
									subFolderPath="hospital/etcFiles"
									bearer={`${Cookies.get("accessToken")}`}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...hospitalForm,
												files: { ...hospitalForm.files, etcFiles: e },
											})
										);
									}}
								/>
							</div>
						</div>
					</div>
				</>
			),
		},
	];

	const firstSection: CollapseProps["items"] = [
		{
			key: "1",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดของสถานพยาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.hospitalDbmsCode}
							itemName="hospitalDbmsCode"
							rules={rules.hospitalDbmsCodeSchema}
							value={hospitalForm.hospitalDbmsCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalDbmsCode: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							pageLevel="edit"
							label={names.hospitalWcfCode}
							itemName="hospitalWcfCode"
							rules={rules.hospitalWcfCodeSchema}
							value={hospitalForm.hospitalWcfCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalWcfCode: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							pageLevel="edit"
							label={names.hospitalMinistryCode}
							itemName="hospitalMinistryCode"
							rules={rules.hospitalMinistryCodeSchema}
							value={hospitalForm.hospitalMinistryCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalMinistryCode: e.target.value,
									})
								);
							}}
						/>

						<BaseItemCheckbox
							pageLevel="edit"
							itemName="checkIsParticipateSso"
							label="เข้าร่วมโครงการประกันสังคม"
							checked={hospitalForm.checkIsParticipateSso}
							labelPosition={BaseFormItemPosition.LEFT}
							onClickFunction={() => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										checkIsParticipateSso: !hospitalForm.checkIsParticipateSso,
										isParticipateSso: !hospitalForm.checkIsParticipateSso
											? "Y"
											: "N",
									})
								);
							}}
						/>
					</div>
					<BaseHorizontalHeader
						className="mb-7"
						title={"ข้อมูลพื้นฐานสถานพยาบาล"}
						icons={<HomeFilled />}
					/>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.hospitalName}
							itemName="hospitalName"
							rules={rules.hospitalNameSchema}
							value={hospitalForm.hospitalName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalName: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.companyName}
							itemName="companyName"
							rules={rules.companyNameSchema}
							value={hospitalForm.companyName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										companyName: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.revenueRegistrationCode}
							itemName="revenueRegistrationCode"
							rules={rules.revenueRegistrationCodeSchema}
							value={hospitalForm.revenueRegistrationCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										revenueRegistrationCode: e.target.value,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.address}
							itemName="address"
							rules={rules.addressSchema}
							value={hospitalForm.address}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										address: e.target.value,
									})
								);
							}}
						/>

						<MedDropDown
							pageLevel="edit"
							label={names.tambolCode}
							itemName="tambolCode"
							rules={rules.tambolCodeSchema}
							type={SESSION_NAME.ADDRESS}
							getValue={(e: Address) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										amphurCode: e.amphurCode,
										provinceCode: e.provinceCode,
										tambolCode: e.tambolCode,
										postalCode: e.postalCode,
									})
								);
							}}
							labelRender={() => (
								<p>
									{findLabelAddress(hospitalForm.tambolCode, ADDRESS.TAMBOL)}
								</p>
							)}
						/>
						<MedDropDown
							pageLevel="edit"
							label={names.amphurCode}
							itemName="amphurCode"
							rules={rules.amphurCodeSchema}
							type={SESSION_NAME.ADDRESS}
							getValue={(e: Address) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										amphurCode: e.amphurCode,
										provinceCode: e.provinceCode,
										tambolCode: e.tambolCode,
										postalCode: e.postalCode,
									})
								);
							}}
							labelRender={() => (
								<p>
									{findLabelAddress(hospitalForm.amphurCode, ADDRESS.AMPHUR)}
								</p>
							)}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<MedDropDown
							pageLevel="edit"
							label={names.provinceCode}
							itemName="provinceCode"
							rules={rules.provinceCodeSchema}
							type={SESSION_NAME.ADDRESS}
							getValue={(e: Address) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										amphurCode: e.amphurCode,
										provinceCode: e.provinceCode,
										tambolCode: e.tambolCode,
										postalCode: e.postalCode,
									})
								);
							}}
							labelRender={() => (
								<p>
									{findLabelAddress(
										hospitalForm.provinceCode,
										ADDRESS.PROVINCE
									)}
								</p>
							)}
						/>

						<MedDropDown
							pageLevel="edit"
							label={names.postalCode}
							itemName="postalCode"
							rules={rules.postalCodeSchema}
							type={SESSION_NAME.ADDRESS}
							getValue={(e: Address) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										amphurCode: e.amphurCode,
										provinceCode: e.provinceCode,
										tambolCode: e.tambolCode,
										postalCode: e.postalCode,
									})
								);
							}}
							labelRender={() => (
								<p>
									{findLabelAddress(hospitalForm.postalCode, ADDRESS.POSTCODE)}
								</p>
							)}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.telephoneNumber}
							itemName="telephoneNumber"
							rules={rules.telephoneNumberSchema}
							value={hospitalForm.telephoneNumber}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										telephoneNumber: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.faxNumber}
							itemName="faxNumber"
							rules={rules.faxNumberSchema}
							value={hospitalForm.faxNumber}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										faxNumber: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							pageLevel="edit"
							label={names.email}
							itemName="email"
							rules={rules.emailSchema}
							value={hospitalForm.email}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										email: e.target.value,
									})
								);
							}}
						/>
					</div>

					<BaseHorizontalHeader
						className="mb-4"
						title={"ผู้ติดต่อสำหรับโรงพยาบาล"}
						icons={<HomeFilled />}
					/>
					<div className="flex justify-end">
						<BaseButton
							type="default"
							className="text-base font-regular mb-4"
							label="เพิ่มผู้ติดต่อ"
							onClick={() => {
								dispatch(
									setDialog({
										...modelDialog,
										isOpenBaseConfirmDialog: false,
										isOpen: true,
										uniqueContent: <AddHospitalStaffContactForm />,
									})
								);
							}}
							icon={<UserAddOutlined />}
							customStyle={{
								width: "134px",
								height: "48px",
								borderRadius: "99px",
							}}
						/>
					</div>

					<div>
						<BaseGrid
							isShowPagination={false}
							rows={hospitalStaffContact.grid.data}
							columns={HospitalStaffContactGrid({
								hospitalStaffContact: hospitalStaffContact,
								outsideHospitalForm: outsideHospitalForm,
								dispatch: dispatch,
								params: params,
								dialog: dialog,
							})}
							page={hospitalStaffContact.grid.page}
							loading={isLoading}
							twoToneColor={true}
							setPagination={(page) => {
								dispatch(
									fetchHospitalStaffContactList(params, {
										...hospitalStaffContact,
										grid: { ...hospitalStaffContact.grid, page },
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	const secondSection: CollapseProps["items"] = [
		{
			key: "2",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลกองทุนเงินทดแทน"
					description="ข้อมูลภาพรวมและรายละเอียดกองทุนเงินทดแทนสำหรับสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.contractStartDate}
							pageLevel="edit"
							itemName="contractStartDate"
							rules={rules.contractStartDateSchema}
							value={hospitalForm.contractStartDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										contractStartDate: e,
									})
								);
							}}
						/>
						<MedDropDown
							itemName={"hospitalType"}
							pageLevel="edit"
							label={names.hospitalType}
							type={SESSION_NAME.HOSPITAL_TYPE}
							rules={rules.hospitalTypeSchema}
							getValue={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalType: e,
									})
								);
							}}
						/>
						<MedDropDown
							itemName={"hospitalCategory"}
							label={names.hospitalCategory}
							rules={rules.hospitalCategorySchema}
							type={SESSION_NAME.HOSPITAL_CATEGORY}
							pageLevel="edit"
							getValue={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalCategory: e,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<MedDropDown
							pageLevel="edit"
							label={names.ssoProject}
							itemName="ssoProject"
							rules={rules.ssoProjectSchema}
							type={SESSION_NAME.SSO_PROJECT}
							getValue={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										ssoProject: e,
									})
								);
							}}
						/>
					</div>
					{/* <div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.belongTo}
							itemName="belongTo"
							rules={rules.belongToSchema}
							value={hospitalForm.belongTo}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										belongTo: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.numberOfBed}
							itemName="numberOfBed"
							rules={rules.numberOfBedSchema}
							value={hospitalForm.numberOfBed}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										numberOfBed: parseInt(e.target.value),
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.bps}
							itemName="bps"
							rules={rules.bpsSchema}
							value={hospitalForm.bps}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										bps: parseInt(e.target.value),
									})
								);
							}}
						/>
					</div> */}

					{/* <div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.levelChangeDate}
							itemName="levelChangeDate"
							rules={rules.levelChangeDateSchema}
							value={hospitalForm.levelChangeDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										levelChangeDate: e,
									})
								);
							}}
						/>

						<BaseItemInput
							pageLevel="edit"
							label={names.ssoPartner}
							itemName="ssoPartner"
							rules={rules.ssoPartnerSchema}
							value={hospitalForm.ssoPartner}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										ssoPartner: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.tempColumn2}
							itemName="tempColumn2"
							rules={rules.tempColumn2Schema}
							value={hospitalForm.tempColumn2}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tempColumn2: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.tempColumn3}
							itemName="tempColumn3"
							rules={rules.tempColumn3Schema}
							value={hospitalForm.tempColumn3}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tempColumn3: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.tempColumn4}
							itemName="tempColumn4"
							rules={rules.tempColumn4Schema}
							value={hospitalForm.tempColumn4}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tempColumn4: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.tempColumn5}
							itemName="tempColumn5"
							rules={rules.tempColumn5Schema}
							value={hospitalForm.tempColumn5}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tempColumn5: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							pageLevel="edit"
							label={names.hospitalListBoi}
							itemName="hospitalListBoi"
							rules={rules.hospitalListBoiSchema}
							value={hospitalForm.hospitalListBoi}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoi: e.target.value,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.hospitalListBoiStartDate}
							itemName="hospitalListBoiStartDate"
							rules={rules.hospitalListBoiStartDateSchema}
							value={hospitalForm.hospitalListBoiStartDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoiStartDate: e,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.hospitalListBoiExpireDate}
							itemName="hospitalListBoiExpireDate"
							rules={rules.hospitalListBoiExpireDateSchema}
							value={hospitalForm.hospitalListBoiExpireDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoiExpireDate: e,
									})
								);
							}}
						/>
					</div> */}
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							pageLevel="edit"
							label={names.latitude}
							itemName="latitude"
							rules={rules.latitudeSchema}
							value={hospitalForm.latitude}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										latitude: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							pageLevel="edit"
							label={names.longitude}
							itemName="longitude"
							rules={rules.longitudeSchema}
							value={hospitalForm.longitude}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										longitude: e.target.value,
									})
								);
							}}
						/>
					</div>

					<BaseCollapse items={uploadFilesSection} defaultActiveKey={"5"} />
				</>
			),
		},
	];

	const thSection: CollapseProps["items"] = [
		{
			key: "3",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลการเปลี่ยนชื่อสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดการเปลี่ยนชื่อสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-2">
						<BaseItemInput
							pageLevel="edit"
							label={names.oldHospitalName}
							itemName="oldHospitalName"
							rules={rules.oldHospitalNameSchema}
							// value={hospitalForm.oldHospitalName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										oldHospitalName: e.target.value,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							pageLevel="edit"
							label={names.hospitalChangeNameDate}
							itemName="hospitalChangeNameDate"
							rules={rules.hospitalChangeNameDateSchema}
							value={hospitalForm.hospitalChangeNameDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalChangeNameDate: e,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	const fourthSection: CollapseProps["items"] = [
		{
			key: "4",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลการยกเลิกสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดการเปลี่ยนชื่อสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							pageLevel="edit"
							label={names.contractEndDate}
							itemName="contractEndDate"
							rules={rules.contractEndDateSchema}
							// value={hospitalForm.contractEndDate}
							disabled={
								!_.isEmpty(params.params.uuid) &&
								!_.isEmpty(hospitalForm.contractEndDate)
									? true
									: false
							}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										contractEndDate: e,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-2">
						<BaseItemTextArea
							pageLevel="edit"
							label={names.remarkChangeName}
							itemName="remarkChangeName"
							rules={rules.remarkChangeNameSchema}
							value={hospitalForm.remarkChangeName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										remarkChangeName: e.target.value,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				bodyHeaderText={dialog.headerText}
				bodyDescriptionText={`${dialog.content}`}
				confirmFunction={() => {
					if (onConfirm) onConfirm();
				}}
				cancelFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
				closeFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
			/>

			{true && (
				<>
					<BaseHeaderNameAndSwitch
						textHeader={"แก้ไขข้อมูลสถานพยาบาล"}
						onChangeSwitchFunction={(e) => {
							dispatch(
								setHospitalForm({
									...hospitalForm,
									isActive: e ? IsActive.Y : IsActive.N,
								})
							);
						}}
						onClickHistoryButtonFunction={() => {
							dispatch(
								setDialog({
									...modelDialog,
									isOverFlow: true,
									isOpenBaseConfirmDialog: false,
									isOpen: true,
									uniqueContent: <HospitalHistory />,
								})
							);
						}}
						switchCheckValue={_.trim(hospitalForm.isActive) === IsActive.Y}
					/>
					<div className="mb-4"></div>

					<BaseForm
						name={"hospitalForm"}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						initialValues={{
							...hospitalForm,
							...outsideHospitalForm,
						}}
						extraForm={form}
					>
						<BaseCollapse items={firstSection} defaultActiveKey={"1"} />
						<BaseCollapse
							className="padding-2"
							items={secondSection}
							defaultActiveKey={"2"}
						/>
						{/* <BaseCollapse items={uploadFilesSection} defaultActiveKey={"5"} /> */}

						<div className="grid grid-cols-12 gap-4 mb-5">
							<div
								className="col-span-8 bg-white h-fit"
								style={{
									borderStartEndRadius: "16px",
									borderStartStartRadius: "16px",
								}}
							>
								<BaseGrid
									rows={hospitalAnnouncedPriceFiles.grid.data}
									columns={AnnouncedPriceFilesGrid({
										hospitalAnnouncedPriceFiles: hospitalAnnouncedPriceFiles,
										dispatch: dispatch,
										params: params,
										dialog: dialog,
									})}
									page={hospitalAnnouncedPriceFiles.grid.page}
									loading={isLoading}
									twoToneColor={true}
									setPagination={(page) => {
										dispatch(
											fetchHospitalAnnouncedPriceFilesList(params, {
												...hospitalAnnouncedPriceFiles,
												grid: { ...hospitalAnnouncedPriceFiles.grid, page },
											})
										);
									}}
								/>
							</div>
							<div className="col-span-4 ">
								<BaseGreenHeader
									title="อัพโหลดเอกสารข้อมูลราคาประกาศ"
									description="เอกสารข้อมูลราคาประกาศ"
									className=""
								/>
								<div className="grid gap-x-4 gap-y-2 grid-cols-1 pb-6 px-6 pt-7 bg-white">
									<BaseDropDown
										itemName={"announcedPriceYear"}
										option={yearOption}
										value={outsideHospitalForm.announcedPriceYear}
										label={names.announcedPriceYear}
										onChangeFunction={(e) => {
											dispatch(
												setOutsideHospitalForm({
													...outsideHospitalForm,
													announcedPriceYear: e.target.value,
												})
											);
										}}
									/>
								</div>
								<div>
									<BaseUploadDraggerHospital
										allowFileTypesToUpload={[FILE_TYPES.PDF]}
										className="style2"
										uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
										subFolderPath="hospital/announcedPriceFiles"
										bearer={`${Cookies.get("accessToken")}`}
										onChangeFunction={(e) => {
											dispatch(
												setHospitalForm({
													...hospitalForm,
													files: {
														...hospitalForm.files,
														announcedPriceFiles: e,
													},
												})
											);
										}}
									/>
								</div>
							</div>
						</div>
						{/* {uploadAnnouncedPriceFilesSection()} */}

						<BaseCollapse items={thSection} defaultActiveKey={"3"} />
						<BaseCollapse items={fourthSection} defaultActiveKey={"4"} />

						<div className="flex justify-end">
							<BaseButtonCancel
								className="mr-3"
								onClick={() => {
									router.push(LINKS.HOSPITAL.link);
								}}
							/>
							<BaseButtonSave className="" htmlType="submit" />
						</div>
					</BaseForm>
				</>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(HospitalFormPage), { ssr: false });
