"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { FilterOutlined } from "wcf-component-lib/node_modules/@ant-design/icons";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { grid } from "./columns/grid";
import { fetchMedicalAmountList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelMedicalAmount } from "./redux/model";
import { setMedicalAmountFilter } from "./redux";

export default function MedicalAmount() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { medicalAmount, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.loading.isLoading,
			medicalAmount: state.medicalAmount,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchMedicalAmountList(medicalAmount));
	}, []);

	return (
		<div>
			<MasterDataLayout
				AddLabel="เพิ่ม Medical Amount"
				Header="Course"
				TotalItems={medicalAmount.grid.page.totalData}
				SearchButtonFunction={() => {}}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				Grid={
					<BaseGrid
						rows={medicalAmount.grid.data}
						columns={grid}
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
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							dispatch(fetchMedicalAmountList(medicalAmount));
						}}
						clearFilter={() => {
							dispatch(setMedicalAmountFilter(modelMedicalAmount.filter));
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.MEDICAL_AMOUNT.add)}
			/>
		</div>
	);
}
