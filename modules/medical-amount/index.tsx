"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import { GetColumns } from "./columns/grid";
import { fetchMedicalAmountList } from "./service";
import { setMedicalAmountFilter } from "./redux";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { BaseForm, BaseItemDatePicker } from "wcf-component-lib/src/components";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { MedicalAmountFilter, modelMedicalAmountFilter } from "./redux/model";

export default function MedicalAmount() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { medicalAmount, isLoading, filter, page } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			medicalAmount: state.medicalAmount,
			filter: state.medicalAmount.filter,
			page: state.medicalAmount.grid.page,
		}),
		shallowEqual
	);

	const [form] = Form.useForm();

	const [tmpFilter, setTmpFilter] = useState<MedicalAmountFilter>(
		modelMedicalAmountFilter
	);

	useEffect(() => {
		dispatch(setMedicalAmountFilter(modelMedicalAmountFilter));
		dispatch(
			fetchMedicalAmountList({
				...medicalAmount,
				filter: modelMedicalAmountFilter,
			})
		);
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={{ ...tmpFilter }}
								extraForm={form}
								onValuesChange={(e) => {
									setTmpFilter({ ...tmpFilter, ...e });
								}}
							>
								<div className="grid grid-cols-4 gap-x-2 w-full">
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
										notForm
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										value={tmpFilter.isActive}
										itemName="isActive"
										getValue={(value) => {
											setTmpFilter({
												...tmpFilter,
												isActive: value,
											});
										}}
									/>
								</div>
							</BaseForm>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							const newFilter = { ...filter, ...tmpFilter };
							dispatch(setMedicalAmountFilter(newFilter));
							dispatch(
								fetchMedicalAmountList({
									...medicalAmount,
									filter: newFilter,
									grid: {
										...medicalAmount.grid,
										page: { ...page, pageNumber: 0 },
									},
								})
							);
						}}
					/>
				}
				AddLabel="เพิ่มอัตราการจ่ายค่าตอบแทนแพทย์"
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
