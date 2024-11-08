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
import MedDivPermission from "@/components/MedDivPermission";
import { MedKey } from "@/components/MedDivPermission/model";
import MedButton from "@/components/MedButton";
import { BaseButton } from "wcf-component-lib/src/components";
import MedItemInput from "@/components/MedItemInput";
import DivPermission from "wcf-component-lib/src/components/BaseDivPermission";

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
								<MedDivPermission pageLevel="clinic">
									<p>ทดสอบ</p>
								</MedDivPermission>
								<DivPermission pageLevel="clinic">
									<p>ทดสอบ2</p>
								</DivPermission>
								<MedButton pageLevel="clinic" label="ทดสอบ" />
								<BaseButton<MedKey> pageLevel="clinic" label="ทดสอบ2" />
								<MedItemInput
									pageLevel="clinic"
									value={filter.clinicCodeLike}
									notForm
									itemName="clinicCodeLike"
									label="ทดสอบ"
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
								<BaseItemInput<MedKey>
									pageLevel="clinic"
									value={filter.clinicCodeLike}
									notForm
									itemName="clinicCodeLike"
									label="ทดสอบ2"
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
								{/* <BaseItemInput
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
								/> */}
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						// handleSubmitSearch={() => {}}
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
