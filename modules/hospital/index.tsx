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
import { modelHospital } from "./redux/models/hospitalModel";
import { setHospitalFilter, setHospitalGrid } from "./redux";
import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { GetHospitalColumns } from "./columns/hospitalGrid";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function Hospital() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { hospital, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			hospital: state.hospital,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchHospitalList(hospital));
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseItemInput notForm label="ค้นหา" onPressEnter={() => {}} />
						}
						handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {}}
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
