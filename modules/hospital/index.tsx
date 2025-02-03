"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { fetchHospitalList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./filterDrawer";
import {
	HospitalFilter,
	modelHospital,
	Hospital,
} from "./redux/models/hospitalModel";
import { setHospitalFilter, setHospitalGrid } from "./redux";
import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { GetHospitalColumns } from "./columns/hospitalGrid";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import {
	DROPDOWN_ISACTIVE,
	SESSION_NAME,
} from "../../components/MedDropDown/model";
import MedDropDown from "@/components/MedDropDown";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import Form from "wcf-component-lib/node_modules/antd/es/form";
// import { Hospital } from "@/redux/models/hospitalModel";

export default function HospitalPage() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { hospital, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			hospital: state.hospital,
			filter: state.hospital.filter,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<HospitalFilter>();
	const hospitalNameLike: keyof HospitalFilter = "hospitalNameLike";
	const provinceCodeLike: keyof HospitalFilter = "provinceCodeLike";
	const isActive: keyof HospitalFilter = "isActive";

	useEffect(() => {
		dispatch(fetchHospitalList(hospital));
	}, []);
	const onFinish: FormProps<HospitalFilter>["onFinish"] = async (value) => {
		const newHospital: Hospital = {
			...hospital,
			filter: {
				...filter,
				...value,
			},
		};
		dispatch(fetchHospitalList(newHospital));
	};

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={filter}
								extraForm={form}
								onFinish={onFinish}
							>
								<div className="grid grid-cols-3 gap-x-2">
									<BaseItemInput
										label="ชื่อสถานพยาบาล"
										itemName={hospitalNameLike}
										onPressEnter={() => form.submit()}
									/>

									<MedDropDown
										label="จังหวัด"
										itemName={provinceCodeLike}
										type={SESSION_NAME.PROVINCE_NAME}
										getValue={(e) => {
											console.log("🚀 ~ Hospital ~ e:", e);
											// form.setFieldValue("proviceHospitalLike", e);
										}}
									/>

									<MedDropDown
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										value={filter.isActive}
										itemName={isActive}
										// getValue={(value) => {
										// dispatch(
										// 	setOrganSystemWpiFilter({
										// 		...filter,
										// 		isActive: value,
										// 	})
										// );
										// }}
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
				AddLabel="เพิ่มสถานพยาบาล"
				TotalItems={hospital.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={hospital.grid.data}
						columns={GetHospitalColumns(router)}
						page={hospital.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchHospitalList({
									...hospital,
									grid: { ...hospital.grid, page },
								})
							);
						}}
					/>
				}
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							dispatch(
								setHospitalGrid({
									data: hospital.grid.data,
									page: {
										...hospital.grid.page,
										pageNumber: modelPaginationOptions.pageNumber,
									},
								})
							);
							dispatch(fetchHospitalList(hospital));
						}}
						clearFilter={() => {
							dispatch(setHospitalFilter(modelHospital.filter));
							dispatch(
								setHospitalGrid({
									data: hospital.grid.data,
									page: {
										...hospital.grid.page,
										pageNumber: modelPaginationOptions.pageNumber,
									},
								})
							);
							// dispatch(
							// 	fetchHospitalList({
							// 		...hospital,
							// 		grid: {
							// 			...hospital.grid,
							// 			page: { ...modelPaginationOptions },
							// 		},
							// 	})
							// );
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.HOSPITAL.add)}
			/>
		</div>
	);
}
