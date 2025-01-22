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
import { EstimateAddFilter } from "../../redux/models/hospitalModel";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { estimateAddNames } from "../../interfaces/estimateAddNames";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";
import BaseItemDateRangePicker from "wcf-component-lib/src/components/BaseItemDateRangePicker";
import { fetchHospitalEstimateList } from "./service";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import MedDropDown from "../../../../components/MedDropDown";
import { SESSION_NAME } from "../../../../components/MedDropDown/model";

export default function EstimateAdd() {
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
		dispatch(fetchHospitalEstimateList(filter));
	}, []);

	const [form] = Form.useForm();
	const [formDrawer] = Form.useForm();

	const onFinish: FormProps["onFinish"] = (value) => {
		const toFilter: EstimateAddFilter = {
			hospitalWCFCodeLike: value.hospitalWCFCode,
			notiDateStartLike: value.notifyDate
				? value.notifyDate[0].format(DateFormat.YYYYMMDD).toString()
				: undefined,
			notiDateEndLike: value.notifyDate
				? value.notifyDate[1].format(DateFormat.YYYYMMDD).toString()
				: undefined,
			userFirstNameLike: value.userFirstName,
			userLastNameLike: value.userLastName,
		};
		dispatch(fetchHospitalEstimateList(toFilter));
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
						setPagination={(page) => {}}
					/>
				}
				AddButton={<div></div>}
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={filter}
								extraForm={form}
								onFinish={onFinish}
							>
								<div className="flex space-x-2">
									<MedDropDown
										itemName={"hospitalWCFCode"}
										label={estimateAddNames.hospital_name}
										type={SESSION_NAME.HOSPITAL_LIST_WCF_PLATFORM}
									/>

									{/* <BaseItemInput
										itemName={"hospitalWCFCode"}
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
				AddFunction={() => router.push(LINKS.DOCTOR.add)}
				AddLabel="สร้าง"
				TotalItems={estimateAdd.grid.page.totalData}
			/>
		</div>
	);
}
