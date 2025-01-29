"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { useRouter } from "next/navigation";
import { EstimateAddGrid } from "../../columns/estimateAddGrid";
import { LINKS } from "../../../../constants/links";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import _ from "lodash";
import {
	EstimateAddFilter,
	EstimateAdd,
} from "../../redux/models/hospitalModel";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { estimateAddNames } from "../../interfaces/estimateAddNames";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";
import BaseItemDateRangePicker from "wcf-component-lib/src/components/BaseItemDateRangePicker";
import { fetchHospitalEstimateList } from "./service";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import MedDropDown from "../../../../components/MedDropDown";
import {
	HOSPITAL_ASSESSMENT_ASSESS_TYPE,
	SESSION_NAME,
} from "../../../../components/MedDropDown/model";
import {
	setHospitalEstimateAdd,
	setHospitalEstimateAddGrid,
} from "../../redux";
import { estimateAddRules } from "../../field-validation/EstimateAddFormValidation";

export default function EstimateAddList() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { estimateAdd, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			estimateAdd: state.hospital.estimateAdd,
			filter: state.hospital.estimateAdd.filter,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchHospitalEstimateList(estimateAdd));
	}, []);

	const [form] = Form.useForm();
	// const [formDrawer] = Form.useForm();

	const onFinish: FormProps["onFinish"] = (value) => {
		const toFilter: EstimateAddFilter = {
			hospitalWcfCodeLike: value.hospitalWcfCode,
			// notiDateStartLike:
			// notiDateEndLike:
			notifyDateBetween: _.isEmpty(value.notifyDate)
				? null
				: [
						value.notifyDate
							? value.notifyDate[0].format(DateFormat.YYYYMMDD).toString()
							: undefined,
						value.notifyDate
							? value.notifyDate[1].format(DateFormat.YYYYMMDD).toString()
							: undefined,
				  ],
			userFirstNameLike: value.userFirstName,
			userLastNameLike: value.userLastName,
		};
		const newBody: EstimateAdd = {
			...estimateAdd,
			filter: toFilter,
		};
		// dispatch(setHospitalEstimateAdd(newBody));
		dispatch(fetchHospitalEstimateList(newBody));
	};

	return (
		<div>
			<MasterDataLayout
				Grid={
					<BaseGrid
						rows={estimateAdd.grid.data}
						columns={EstimateAddGrid(router)}
						page={estimateAdd.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchHospitalEstimateList({
									...estimateAdd,
									grid: {
										...estimateAdd.grid,
										page,
									},
								})
							);

							// dispatch(
							// 	setHospitalEstimateAdd({
							// 		...estimateAdd,
							// 		grid: {
							// 			...estimateAdd.grid,
							// 			page,
							// 		},
							// 	})
							// );
						}}
					/>
				}
				// AddButton={<div></div>}
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={filter}
								extraForm={form}
								onFinish={onFinish}
							>
								<div className="flex space-x-2">
									{/* <MedDropDown
										itemName={"hospitalWcfCode"}
										type={SESSION_NAME.HOSPITAL_LIST_WCF_PLATFORM}
									/> */}

									<MedDropDown
										pageLevel="edit"
										label={estimateAddNames.hospital_name}
										type={SESSION_NAME.HOSPITAL_WCF_CODE_VALUE}
										itemName="hospitalWcfCode"
									/>

									{/* <BaseItemInput
										itemName={"hospitalWcfCode"}
										label={estimateAddNames.hospital_name}
										onPressEnter={() => form.submit()}
									/> */}
									<BaseItemInput
										itemName={"userFirstName"}
										label={estimateAddNames.userFirstName}
										onPressEnter={() => form.submit()}
									/>
									<BaseItemInput
										itemName={"userLastName"}
										label={estimateAddNames.userLastName}
										onPressEnter={() => form.submit()}
									/>

									<BaseItemDateRangePicker
										itemName="notifyDate"
										label={estimateAddNames.notifyDate}
									/>
								</div>
							</BaseForm>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							form.submit();
						}}
					/>
				}
				Drawer={<></>}
				AddFunction={() => router.push(LINKS.HOSPITAL.hospitalAssessment.form)}
				AddLabel="สร้าง"
				TotalItems={estimateAdd.grid.page.totalData}
			/>
		</div>
	);
}
