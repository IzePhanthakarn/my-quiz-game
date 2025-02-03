"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import { GetColumns } from "./columns/manipulate";
import { fetchOrganList } from "./service";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { setOrganSystemWpiFilter, setOrganSystemWpiPagination } from "./redux";
import { organSystemWpiName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { modelOrganSystemWpiFilter, OrganSystemWpiFilter } from "./redux/model";

export default function OrganSystemWpi() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { organ, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			organ: state.organSystemWpi,
			filter: state.organSystemWpi.filter,
		}),
		shallowEqual
	);

	const [tmpFilter, setTmpFilter] = useState<OrganSystemWpiFilter>(
		modelOrganSystemWpiFilter
	);

	const search = () => {
		const newFilter = { ...filter, ...tmpFilter };
		dispatch(setOrganSystemWpiFilter(newFilter));
		dispatch(
			fetchOrganList({
				...organ,
				filter: newFilter,
				grid: {
					...organ.grid,
					page: {
						...organ.grid.page,
						pageNumber: 0,
					},
				},
			})
		);
	};

	useEffect(() => {
		dispatch(setOrganSystemWpiFilter(modelOrganSystemWpiFilter));
		dispatch(fetchOrganList({ ...organ, filter: modelOrganSystemWpiFilter }));
	}, []);

	return (
		<div className="w-full h-full">
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="grid grid-cols-4 gap-x-2">
								<BaseItemInput
									notForm
									label={organSystemWpiName.organSystemNo}
									itemName="organSystemNoLike"
									value={tmpFilter.organSystemNoLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											organSystemNoLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										dispatch(
											fetchOrganList({
												...organ,
												grid: {
													...organ.grid,
													page: {
														...organ.grid.page,
														pageNumber: 0,
													},
												},
											})
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={organSystemWpiName.description}
									itemName="descriptionLike"
									value={tmpFilter.descriptionLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											descriptionLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										dispatch(
											fetchOrganList({
												...organ,
												grid: {
													...organ.grid,
													page: {
														...organ.grid.page,
														pageNumber: 0,
													},
												},
											})
										);
									}}
								/>
								<div className="w-[240px]">
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
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							search();
						}}
					/>
				}
				AddLabel="เพิ่มข้อมูลอวัยวะ"
				TotalItems={organ.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={organ.grid.data}
						columns={GetColumns(router)}
						page={organ.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(setOrganSystemWpiPagination(page));
							dispatch(
								fetchOrganList({
									...organ,
									grid: { ...organ.grid, page: { ...page } },
									filter: modelOrganSystemWpiFilter,
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
				// 			dispatch(fetchOrganList(organ));
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.ORGAN_SYSTEM_WPI.add)}
			/>
		</div>
	);
}
