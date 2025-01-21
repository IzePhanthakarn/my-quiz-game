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

import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { EstimateAddFilesGrid } from "../../columns/estimateAddFilesGrid";
import { fetchHospitalEstimateDetail } from "./service";
import dynamic from "next/dynamic";
import { setHospitalEstimateAddForm } from "../../redux";
import { modelEstimateAdd } from "../../redux/models/hospitalModel";

const HospitalAssessmentForm = (params: HospitalAssessmentPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const { form, isLoading } = useSelector(
		(state: SliceModel) => ({
			form: state.hospital.estimateAdd.form,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!_.isEmpty(params.params.uuid)) {
				dispatch(fetchHospitalEstimateDetail());
			} else {
				dispatch(setHospitalEstimateAddForm(modelEstimateAdd.form));
			}
		})();
	}, []);

	return (
		<>
			<BaseForm
				name={"form"}
				initialValues={{
					...form,
				}}
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
								disabled={true}
								label={estimateAddNames.hospital_name}
								itemName="hospital_name"
								rules={estimateAddRules.hospital_nameSchema}
								value={form.hospital_name}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.assessType}
								itemName="assessType"
								rules={estimateAddRules.assessTypeSchema}
								value={form.assessType}
							/>
						</div>
						<BaseHorizontalHeader
							className="mb-7"
							title={"ข้อมูลทั่วไป"}
							icons={<HomeFilled />}
						/>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.userFirstName}
								itemName="userFirstName"
								rules={estimateAddRules.userFirstNameSchema}
								value={form.userFirstName}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.userLastName}
								itemName="userLastName"
								rules={estimateAddRules.userLastNameSchema}
								value={form.userLastName}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.email}
								itemName="email"
								rules={estimateAddRules.emailSchema}
								value={form.email}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.refDocNo}
								itemName="refDocNo"
								rules={estimateAddRules.refDocNoSchema}
								value={form.refDocNo}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.refDocDate}
								itemName="refDocDate"
								rules={estimateAddRules.refDocDateSchema}
								value={form.refDocDate}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.notifyDate}
								itemName="notifyDate"
								rules={estimateAddRules.notifyDateSchema}
								value={form.notifyDate}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.visitDate}
								itemName="visitDate"
								rules={estimateAddRules.visitDateSchema}
								value={form.visitDate}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.resultStatus}
								itemName="resultStatus"
								rules={estimateAddRules.resultStatusSchema}
								value={form.resultStatus}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<div className="col-span-3">
								<BaseItemTextArea
									disabled={true}
									label={estimateAddNames.resultDesc}
									itemName="resultDesc"
									rules={estimateAddRules.resultDescSchema}
									value={form.resultDesc}
								/>
							</div>
						</div>
						<BaseHorizontalHeader
							className="mb-7"
							title={"เอกสารที่เกี่ยวข้อง"}
							icons={<FileTextOutlined />}
						/>

						<BaseGrid
							rows={form.assessAttachmentfiles}
							columns={EstimateAddFilesGrid()}
							isShowPagination={false}
							loading={isLoading}
							twoToneColor={true}
						/>
					</div>
				</div>
			</BaseForm>
		</>
	);
};

export default dynamic(() => Promise.resolve(HospitalAssessmentForm), {
	ssr: false,
});
