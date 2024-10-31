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

export default function EstimateAdd() {
	const dispatch: AppDispatch = useDispatch();
	const { estimateAdd, isLoading } = useSelector(
		(state: SliceModel) => ({
			estimateAdd: state.hospital.estimateAdd,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	return (
		<>
			<BaseForm
				name={"estimateAdd"}
				initialValues={{
					...estimateAdd,
				}}
			>
				<div className=" ">
					<BaseGreenHeader
						title="รายละเอียด"
						description="ข้อมูลการประเมิณและรายละเอียดของสถานพยาล"
						className=""
					/>
					<div className="py-6 px-10 bg-white">
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.hospitalName}
								itemName="hospitalName"
								rules={estimateAddRules.hospitalNameSchema}
								value={estimateAdd.hospitalName}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.type}
								itemName="type"
								rules={estimateAddRules.typeSchema}
								value={estimateAdd.type}
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
								label={estimateAddNames.name}
								itemName="name"
								rules={estimateAddRules.nameSchema}
								value={estimateAdd.name}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.lastName}
								itemName="lastName"
								rules={estimateAddRules.lastNameSchema}
								value={estimateAdd.lastName}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.email}
								itemName="email"
								rules={estimateAddRules.emailSchema}
								value={estimateAdd.email}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.referenceNumber}
								itemName="referenceNumber"
								rules={estimateAddRules.referenceNumberSchema}
								value={estimateAdd.referenceNumber}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.atDate}
								itemName="atDate"
								rules={estimateAddRules.atDateSchema}
								value={estimateAdd.atDate}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.reportDate}
								itemName="reportDate"
								rules={estimateAddRules.reportDateSchema}
								value={estimateAdd.reportDate}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.checkDate}
								itemName="checkDate"
								rules={estimateAddRules.checkDateSchema}
								value={estimateAdd.checkDate}
							/>
							<BaseItemInput
								disabled={true}
								label={estimateAddNames.result}
								itemName="result"
								rules={estimateAddRules.resultSchema}
								value={estimateAdd.result}
							/>
						</div>
						<div className="grid gap-x-6 gap-y-2 grid-cols-4">
							<div className="col-span-3">
								<BaseItemTextArea
									disabled={true}
									label={estimateAddNames.detail}
									itemName="detail"
									rules={estimateAddRules.detailSchema}
									value={estimateAdd.detail}
								/>
							</div>
						</div>
						<BaseHorizontalHeader
							className="mb-7"
							title={"เอกสารที่เกี่ยวข้อง"}
							icons={<FileTextOutlined />}
						/>

						<BaseGrid
							rows={estimateAdd.files}
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
}
