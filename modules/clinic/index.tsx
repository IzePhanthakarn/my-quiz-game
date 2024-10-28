"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
// import { columns } from "./model";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { setClinicFilter, setOrder, setPagination } from "./redux";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import FilterDrawer from "./FilterDrawer";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { modelClinicFilter } from "./redux/filter/model";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { GetColumns } from "./model";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, page, isOpen, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			rows: state.clinic.grid.list,
			page: state.clinic.grid.page,
			isOpen: state.drawer.isOpen,
			filter: state.clinic.clinicFilter,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(
			initClinicGrid({
				pagination: { ...page },
				clinicCodeLike: filter.clinicCodeLike,
				clinicNameLike: filter.clinicNameLike,
				isActive: filter.isActive,
			})
		);
	}, [page.pageNumber, page.pageSize, page.orders]);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="flex items-center w-full h-full space-x-6">
								<BaseItemInput
									value={filter.clinicCodeLike}
									notForm
									itemName="clinicCodeLike"
									label="รหัสคลินิก"
									onPressEnter={() => {}}
									onChangeFunction={(e) => {
										dispatch(
											setClinicFilter({
												...filter,
												clinicCodeLike: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									value={filter.clinicCodeLike}
									itemName="clinicCodeLike"
									label="รหัสคลินิก"
									onPressEnter={() => {}}
									onChangeFunction={(e) => {
										dispatch(
											setClinicFilter({
												...filter,
												clinicCodeLike: e.target.value,
											})
										);
									}}
								/>
							</div>
						}
						handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {}}
					/>
				}
				Grid={
					<BaseGrid
						rows={rows}
						columns={GetColumns(router)}
						page={page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(setPagination(page));
						}}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isOpen}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						content={<FilterDrawer />}
						isFilter
						confirmFuntion={() =>
							dispatch(
								initClinicGrid({
									pagination: { ...page },
									clinicCodeLike: filter.clinicCodeLike,
									clinicNameLike: filter.clinicNameLike,
									isActive: filter.isActive,
								})
							)
						}
						clearFilter={() => dispatch(setClinicFilter(modelClinicFilter))}
					/>
				}
				AddFunction={() => router.push(LINKS.CLINIC.add)}
				AddLabel="เพิ่มคลินิก"
				TotalItems={page.totalData}
			/>
		</div>
	);
}
