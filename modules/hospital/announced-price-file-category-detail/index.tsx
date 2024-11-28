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
import { hospitalAnnouncedPriceFileCategoryDetailName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setHospitalAnnouncedPriceFileCategoryDetailFilter } from "../redux";

export default function HospitalAnnouncedPriceFileCategoryDetail() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const {
		HospitalAnnouncedPriceFileCategoryDetail,
		isOpen,
		isLoading,
		filter,
	} = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			HospitalAnnouncedPriceFileCategoryDetail:
				state.hospital.hospitalAnnouncedPriceFileCategoryDetail,
			filter: state.hospital.hospitalAnnouncedPriceFileCategoryDetail.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(HospitalAnnouncedPriceFileCategoryDetail));
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
										hospitalAnnouncedPriceFileCategoryDetailName.categoryCode
									}
									itemName="categoryCodeLike"
									value={filter.categoryCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileCategoryDetailFilter({
												...filter,
												categoryCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceFileCategoryDetail)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={
										hospitalAnnouncedPriceFileCategoryDetailName.categoryName
									}
									itemName="categoryNameLike"
									value={filter.categoryNameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileCategoryDetailFilter({
												...filter,
												categoryNameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceFileCategoryDetail)
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
												setHospitalAnnouncedPriceFileCategoryDetailFilter({
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
								fetchCourseList(HospitalAnnouncedPriceFileCategoryDetail)
							);
						}}
					/>
				}
				AddLabel="เพิ่มประเภทราคาประกาศ"
				TotalItems={
					HospitalAnnouncedPriceFileCategoryDetail.grid.page.totalData
				}
				Grid={
					<BaseGrid
						rows={HospitalAnnouncedPriceFileCategoryDetail.grid.data}
						columns={GetColumns(router)}
						page={HospitalAnnouncedPriceFileCategoryDetail.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...HospitalAnnouncedPriceFileCategoryDetail,
									grid: {
										...HospitalAnnouncedPriceFileCategoryDetail.grid,
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
				// 			dispatch(fetchCourseList(HospitalAnnouncedPriceFileCategoryDetail));
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(
				// 				setHospitalAnnouncedPriceFileCategoryDetailFilter(modelHospitalAnnouncedPriceFileCategoryDetail.filter)
				// 			);
				// 		}}
				// 	/>
				// }
				AddFunction={() =>
					router.push(
						LINKS.HOSPITAL.hospitalAnnouncedPriceFileCategoryDetail.add
					)
				}
			/>
		</div>
	);
}
