"use client";

import React, { useEffect } from "react";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseGreenHeader from "wcf-component-lib/src/components/BaseGreenHeader";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import { estimateAddNames } from "../../interfaces/estimateAddNames";
import { estimateAddRules } from "../../field-validation/EstimateAddFormValidation";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/HomeFilled";
import FileTextOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/FileTextOutlined";
import { useRouter } from "next/navigation";

import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { EstimateAddFilesGrid } from "../../columns/estimateAddFilesGrid";
import {
	fetchHospitalEstimateDetail,
	insertHospitalAssessment,
	updateHospitalAssessment,
} from "./service";
import dynamic from "next/dynamic";
import { setHospitalEstimateAddForm } from "../../redux";
import {
	EstimateAddForm,
	modelEstimateAdd,
} from "../../redux/models/hospitalModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { LINKS } from "@/constants/links";
import BaseUploadDraggerHospital from "wcf-component-lib/src/components/BaseUploadDraggerHospital";
import { FILE_TYPES } from "wcf-component-lib/src/constants/file-types";
dayjs.extend(localeData);
import Cookies from "js-cookie";
import API_PATH from "@/constants/api";
import {
	setDialog,
	setIsOpenBaseConfirmDialog,
	setOnConfirmDialog,
} from "@/redux/slices/dialog";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import MedDropDown from "@/components/MedDropDown";
import {
	HOSPITAL_ASSESSMENT_ASSESS_TYPE,
	HOSPITAL_ASSESSMENT_RESULT_STATUS,
	SESSION_NAME,
} from "@/components/MedDropDown/model";
const HospitalAssessmentForm = (params: HospitalAssessmentPageProps) => {
	const router = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const { onConfirm, estimateAdd, isLoading, dialog, isOpenBaseConfirmDialog } =
		useSelector(
			(state: SliceModel) => ({
				estimateAdd: state.hospital.estimateAdd,
				isLoading: state.container.isLoading,
				dialog: state.dialog,
				onConfirm: state.dialog.onConfirm,
				isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			}),
			shallowEqual
		);

	useEffect(() => {
		(async () => {
			if (!_.isEmpty(params.params.uuid)) {
				dispatch(fetchHospitalEstimateDetail(params));
			} else {
				dispatch(setHospitalEstimateAddForm(modelEstimateAdd.form));
			}
		})();
	}, []);

	const [form] = Form.useForm();

	const onFinish: FormProps<EstimateAddForm>["onFinish"] = (values) => {
		const newValues: EstimateAddForm = {
			...values,
			visitDate: !_.isEmpty(values.visitDate)
				? dayjs(values.visitDate).format(DateFormat.YYYYMMDD)
				: null,
			notifyDate: !_.isEmpty(values.notifyDate)
				? dayjs(values.notifyDate).format(DateFormat.YYYYMMDD)
				: null,
			refDocDate: !_.isEmpty(values.refDocDate)
				? dayjs(values.refDocDate).format(DateFormat.YYYYMMDD)
				: null,
			hospitalAssessmentFiles: estimateAdd.form.hospitalAssessmentFiles,
			addNewHospitalAssessmentFiles:
				estimateAdd.form.addNewHospitalAssessmentFiles,
			hospitalAssessmentFilesUuidDeleteList:
				estimateAdd.form.hospitalAssessmentFilesUuidDeleteList,
		};
		console.log("🚀 ~ HospitalAssessmentForm ~ newValues:", newValues);

		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateHospitalAssessment(`${params.params.uuid}`, newValues));
		} else {
			dispatch(insertHospitalAssessment(newValues));
		}
	};

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

			<BaseForm
				name={"form"}
				initialValues={{
					...estimateAdd.form,
				}}
				extraForm={form}
				onFinish={onFinish}
			>
				<div className=" ">
					<BaseGreenHeader
						title="รายละเอียด"
						description="ข้อมูลการประเมินและรายละเอียดของสถานพยาล"
						className=""
					/>
					<div className="py-6 px-10 bg-white">
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<MedDropDown
								pageLevel="edit"
								label={estimateAddNames.hospital_name}
								itemName="hospitalWcfCode"
								rules={estimateAddRules.hospital_nameSchema}
								value={estimateAdd.form.hospitalWcfCode}
								type={SESSION_NAME.HOSPITAL_WCF_CODE_VALUE}
							/>
							{/* <BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.hospital_name}
								itemName="hospital_name"
								rules={estimateAddRules.hospital_nameSchema}
								value={estimateAdd.form.hospital_name}
							/> */}
							{/* <BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.assessType}
								itemName="assessType"
								rules={estimateAddRules.assessTypeSchema}
								value={estimateAdd.form.assessType}
							/> */}
							<MedDropDown
								pageLevel="edit"
								label={estimateAddNames.assessType}
								option={HOSPITAL_ASSESSMENT_ASSESS_TYPE}
								value={estimateAdd.form.assessType}
								itemName="assessType"
								rules={estimateAddRules.assessTypeSchema}
							/>
						</div>
						<BaseHorizontalHeader
							className="mb-7"
							title={"ข้อมูลทั่วไป"}
							icons={<HomeFilled />}
						/>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.userFirstName}
								itemName="userFirstName"
								rules={estimateAddRules.userFirstNameSchema}
								value={estimateAdd.form.userFirstName}
							/>
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.userLastName}
								itemName="userLastName"
								rules={estimateAddRules.userLastNameSchema}
								value={estimateAdd.form.userLastName}
							/>
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.email}
								itemName="email"
								rules={estimateAddRules.emailSchema}
								value={estimateAdd.form.email}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.refDocNo}
								itemName="refDocNo"
								rules={estimateAddRules.refDocNoSchema}
								value={estimateAdd.form.refDocNo}
							/>

							<BaseItemDatePicker
								itemForm={form}
								label={estimateAddNames.refDocDate}
								pageLevel="edit"
								itemName="refDocDate"
								rules={estimateAddRules.refDocDateSchema}
								value={estimateAdd.form.refDocDate}
								// onChangeDateFunction={(date, _) => {
								// 	dispatch(
								// 		setHospitalForm({
								// 			...hospitalForm,
								// 			contractStartDate: date
								// 				.format(DateFormat.YYYYMMDD)
								// 				.toString(),
								// 		})
								// 	);
								// }}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemDatePicker
								itemForm={form}
								label={estimateAddNames.notifyDate}
								pageLevel="edit"
								itemName="notifyDate"
								// rules={estimateAddRules.notifyDateSchema}
								value={estimateAdd.form.notifyDate}
								// onChangeDateFunction={(date, _) => {
								// 	dispatch(
								// 		setHospitalForm({
								// 			...hospitalForm,
								// 			contractStartDate: date
								// 				.format(DateFormat.YYYYMMDD)
								// 				.toString(),
								// 		})
								// 	);
								// }}
							/>
							<BaseItemDatePicker
								itemForm={form}
								label={estimateAddNames.visitDate}
								pageLevel="edit"
								itemName="visitDate"
								// rules={estimateAddRules.visitDateSchema}
								value={estimateAdd.form.visitDate}
								// onChangeDateFunction={(date, _) => {
								// 	dispatch(
								// 		setHospitalForm({
								// 			...hospitalForm,
								// 			contractStartDate: date
								// 				.format(DateFormat.YYYYMMDD)
								// 				.toString(),
								// 		})
								// 	);
								// }}
							/>
							{/* <BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.resultStatus}
								itemName="resultStatus"
								rules={estimateAddRules.resultStatusSchema}
								value={estimateAdd.form.resultStatus}
							/> */}
							<MedDropDown
								pageLevel="edit"
								label={estimateAddNames.resultStatus}
								itemName="resultStatus"
								rules={estimateAddRules.resultStatusSchema}
								value={estimateAdd.form.resultStatus}
								option={HOSPITAL_ASSESSMENT_RESULT_STATUS}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<div className="col-span-3">
								<BaseItemTextArea
									pageLevel="edit"
									label={estimateAddNames.resultDesc}
									itemName="resultDesc"
									rules={estimateAddRules.resultDescSchema}
									value={estimateAdd.form.resultDesc}
								/>
							</div>
						</div>
						<BaseHorizontalHeader
							className="mb-7"
							title={"เอกสารที่เกี่ยวข้อง"}
							icons={<FileTextOutlined />}
						/>

						<BaseGrid
							rows={estimateAdd.form.hospitalAssessmentFiles}
							columns={EstimateAddFilesGrid({
								dispatch: dispatch,
								dialog: dialog,
								estimateAddForm: estimateAdd.form,
							})}
							isShowPagination={false}
							loading={isLoading}
							twoToneColor={true}
						/>
						<BaseUploadDraggerHospital
							allowFileTypesToUpload={[
								FILE_TYPES.PDF,
								FILE_TYPES.JPEG,
								FILE_TYPES.PNG,
							]}
							reset={true}
							showUploadList={false}
							className={`style1`}
							uploadUrl={`${process.env.NEXT_PUBLIC_API_URL_MED}${API_PATH.MINIO.UPLOAD}`}
							subFolderPath="hospital/attachmentFile1"
							bearer={`${Cookies.get("accessToken")}`}
							onChangeFunction={(e) => {
								const newFile = {
									originalFileName: e[0].name,
									fileName: e[0].name,
									mimeType: `${_.get(e, "[0].type")}`,
									docPath: "",
									docName: e[0].name,
									createBy: "",
									fileSize: 0,
									attachId: 0,
									assessId: 0,
									fileBase64: `${_.get(e, "[0].base64")}`,
									status: "",
									sha256Hex: "",
									createDate: "",
								};
								// console.log("🚀 ~ HospitalAssessmentForm ~ e:", e);
								const newFiles = estimateAdd.form.hospitalAssessmentFiles || [];
								const newFilesCloned = _.cloneDeep(newFiles);
								newFilesCloned.push(newFile);

								const newFilesToUpload =
									estimateAdd.form.addNewHospitalAssessmentFiles || [];
								const newFilesToUploadCloned = _.cloneDeep(newFilesToUpload);
								newFilesToUploadCloned.push(newFile);

								dispatch(
									setHospitalEstimateAddForm({
										...estimateAdd.form,
										hospitalAssessmentFiles: newFilesCloned,
										addNewHospitalAssessmentFiles: newFilesToUploadCloned,
									})
								);
							}}
						/>
					</div>
				</div>
			</BaseForm>
			<div className="py-2 space-x-6 w-full flex justify-center">
				<BaseButton
					size="small"
					htmlType="submit"
					type="cancel"
					label="ยกเลิก"
					onClick={() => {
						router.push(`${LINKS.HOSPITAL.hospitalAssessment.list}`);
					}}
				/>
				<BaseButton
					// pageLevel="edit"
					size="small"
					htmlType="submit"
					label="บันทึก"
					iconType="save"
					onClick={() => form.submit()}
				/>
			</div>
		</>
	);
};

export default dynamic(() => Promise.resolve(HospitalAssessmentForm), {
	ssr: false,
});
