"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import { GetColumns } from "./columns/grid";
import { fetchCourseList } from "./service";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { hospitalAnnouncedPriceDetailCategoryMasterName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setHospitalAnnouncedPriceDetailCategoryMasterFilter } from "../redux";

export default function HospitalAnnouncedPriceDetailCategoryMaster() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const {
		HospitalAnnouncedPriceDetailCategoryMaster,
		isOpen,
		isLoading,
		filter,
	} = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			HospitalAnnouncedPriceDetailCategoryMaster:
				state.hospital.hospitalAnnouncedPriceDetailCategoryMaster,
			filter: state.hospital.hospitalAnnouncedPriceDetailCategoryMaster.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(HospitalAnnouncedPriceDetailCategoryMaster));
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="flex space-x-2">
								<BaseItemInput
									notForm
									label={
										hospitalAnnouncedPriceDetailCategoryMasterName.categoryCode
									}
									itemName="categoryCodeLike"
									value={filter.categoryCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailCategoryMasterFilter({
												...filter,
												categoryCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(
												HospitalAnnouncedPriceDetailCategoryMaster
											)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={
										hospitalAnnouncedPriceDetailCategoryMasterName.categoryName
									}
									itemName="categoryNameLike"
									value={filter.categoryNameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailCategoryMasterFilter({
												...filter,
												categoryNameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(
												HospitalAnnouncedPriceDetailCategoryMaster
											)
										);
									}}
								/>

								<div className="w-[240px]">
									<MedDropDown
										notForm
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										value={filter.isActive}
										itemName="isActive"
										getValue={(value) => {
											dispatch(
												setHospitalAnnouncedPriceDetailCategoryMasterFilter({
													...filter,
													isActive: value,
												})
											);
										}}
									/>
								</div>
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							dispatch(
								fetchCourseList(HospitalAnnouncedPriceDetailCategoryMaster)
							);
						}}
					/>
				}
				AddLabel="เพิ่มประเภทราคาประกาศ"
				TotalItems={
					HospitalAnnouncedPriceDetailCategoryMaster.grid.page.totalData
				}
				Grid={
					<BaseGrid
						rows={HospitalAnnouncedPriceDetailCategoryMaster.grid.data}
						columns={GetColumns(router)}
						page={HospitalAnnouncedPriceDetailCategoryMaster.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...HospitalAnnouncedPriceDetailCategoryMaster,
									grid: {
										...HospitalAnnouncedPriceDetailCategoryMaster.grid,
										page,
									},
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
				// 			dispatch(fetchCourseList(HospitalAnnouncedPriceDetailCategoryMaster));
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(
				// 				setHospitalAnnouncedPriceDetailCategoryMasterFilter(modelHospitalAnnouncedPriceDetailCategoryMaster.filter)
				// 			);
				// 		}}
				// 	/>
				// }
				AddFunction={() =>
					router.push(
						LINKS.HOSPITAL.hospitalAnnouncedPriceDetailCategoryMaster.add
					)
				}
			/>
		</div>
	);
}
