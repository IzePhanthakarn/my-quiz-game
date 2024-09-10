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
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

export default function MedicalAmount() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { medicalAmount, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			medicalAmount: state.medicalAmount,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<HeaderLayout
					// Header="Medical Amount"
					SearchButtonFunction={() => {}}
					FilterTextField={<BaseItemInput className="w-[300px]" />}
					FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				/>
			),
		});
	}, [dispatchLayout]);

	useEffect(() => {
		dispatch(fetchMedicalAmountList(medicalAmount));
	}, []);

	return (
		<div>
			<MasterDataLayout
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
