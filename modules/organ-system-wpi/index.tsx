"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/manipulate";
import { fetchOrganList } from "./service";
import FilterDrawer from "./FilterDrawer";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { setOrganSystemWpiFilter } from "./redux";
import { organSystemWpiName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setDiplomaFilter } from "../diploma/redux";

export default function OrganSystemWpi() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { organ, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			organ: state.organSystemWpi,
			filter: state.organSystemWpi.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchOrganList(organ));
	}, []);

	return (
		<div className="w-full h-full">
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="flex space-x-2">
								<BaseItemInput
									notForm
									label={organSystemWpiName.organSystemNo}
									itemName="organSystemNoLike"
									value={filter.organSystemNoLike}
									onChangeFunction={(e) => {
										dispatch(
											setOrganSystemWpiFilter({
												...filter,
												organSystemNoLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(fetchOrganList(organ));
									}}
								/>
								<BaseItemInput
									notForm
									label={organSystemWpiName.description}
									itemName="descriptionLike"
									value={filter.descriptionLike}
									onChangeFunction={(e) => {
										dispatch(
											setOrganSystemWpiFilter({
												...filter,
												descriptionLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(fetchOrganList(organ));
									}}
								/>
								<MedDropDown
									notForm
									className="w-[240px]"
									label="สถานะการใช้งาน"
									option={DROPDOWN_ISACTIVE}
									value={filter.isActive}
									itemName="isActive"
									getValue={(value) => {
										dispatch(
											setOrganSystemWpiFilter({
												...filter,
												isActive: value,
											})
										);
									}}
								/>
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							dispatch(fetchOrganList(organ));
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
							dispatch(
								fetchOrganList({ ...organ, grid: { ...organ.grid, page } })
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
