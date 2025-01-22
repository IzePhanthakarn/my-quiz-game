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
import { LINKS } from "../../../../constants/links";
dayjs.extend(localeData);

const HospitalAssessmentForm = (params: HospitalAssessmentPageProps) => {
	const router = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const { estimateAdd, isLoading } = useSelector(
		(state: SliceModel) => ({
			estimateAdd: state.hospital.estimateAdd,
			isLoading: state.container.isLoading,
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
		};
		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateHospitalAssessment(`${params.params.uuid}`, newValues));
		} else {
			dispatch(insertHospitalAssessment(newValues));
		}
	};

	return (
		<>
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
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.hospital_name}
								itemName="hospital_name"
								rules={estimateAddRules.hospital_nameSchema}
								value={estimateAdd.form.hospital_name}
							/>
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.assessType}
								itemName="assessType"
								rules={estimateAddRules.assessTypeSchema}
								value={estimateAdd.form.assessType}
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
								rules={estimateAddRules.notifyDateSchema}
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
								rules={estimateAddRules.visitDateSchema}
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
							<BaseItemInput
								pageLevel="edit"
								label={estimateAddNames.resultStatus}
								itemName="resultStatus"
								rules={estimateAddRules.resultStatusSchema}
								value={estimateAdd.form.resultStatus}
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
							rows={estimateAdd.form.assessAttachmentfiles}
							columns={EstimateAddFilesGrid()}
							isShowPagination={false}
							loading={isLoading}
							twoToneColor={true}
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
