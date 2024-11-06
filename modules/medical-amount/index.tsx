"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/grid";
import { fetchMedicalAmountList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelMedicalAmount } from "./redux/model";
import { setMedicalAmountFilter } from "./redux";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { BaseForm, BaseItemDatePicker } from "wcf-component-lib/src/components";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";

export default function MedicalAmount() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { medicalAmount, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			medicalAmount: state.medicalAmount,
			filter: state.medicalAmount.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchMedicalAmountList(medicalAmount));
	}, []);

	const [form] = Form.useForm();

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={{ ...filter }}
								extraForm={form}
								onValuesChange={(e) => {
									dispatch(setMedicalAmountFilter({ ...filter, ...e }));
								}}
							>
								<div className="flex space-x-2">
									<BaseItemDatePicker
										itemForm={form}
										itemName="startEffectiveDate"
										label="วันที่เริ่มต้นที่มีผล"
									/>
									<BaseItemDatePicker
										itemForm={form}
										itemName="endEffectiveDate"
										label="วันที่สิ้นสุดที่มีผล"
									/>
									<MedDropDown
										className="w-[240px]"
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										itemName="isActive"
									/>
								</div>
							</BaseForm>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							dispatch(fetchMedicalAmountList(medicalAmount));
						}}
					/>
				}
				AddLabel="เพิ่ม Medical Amount"
				TotalItems={medicalAmount.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={medicalAmount.grid.data}
						columns={GetColumns(router)}
						page={medicalAmount.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchMedicalAmountList({
									...medicalAmount,
									grid: { ...medicalAmount.grid, page },
								})
							);
						}}
					/>
				}
				// Drawer={
				// 	<BaseDrawer
				// 		isFilter
				// 		isOpen={isOpen}
				// 		content={<FilterDrawer />}
				// 		setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
				// 		confirmFuntion={() => {
				// 			dispatch(fetchMedicalAmountList(medicalAmount));
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(setMedicalAmountFilter(modelMedicalAmount.filter));
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.MEDICAL_AMOUNT.add)}
			/>
		</div>
	);
}
