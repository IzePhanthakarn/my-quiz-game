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
import { hospitalAnnouncedPriceDetailMasterName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setHospitalAnnouncedPriceDetailMasterFilter } from "../redux";

export default function HospitalAnnouncedPriceDetailMaster() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { HospitalAnnouncedPriceDetailMaster, isOpen, isLoading, filter } =
		useSelector(
			(state: SliceModel) => ({
				isOpen: state.drawer.isOpen,
				isLoading: state.container.isLoading,
				HospitalAnnouncedPriceDetailMaster:
					state.hospital.hospitalAnnouncedPriceDetailMaster,
				filter: state.hospital.hospitalAnnouncedPriceDetailMaster.filter,
			}),
			shallowEqual
		);

	useEffect(() => {
		dispatch(fetchCourseList(HospitalAnnouncedPriceDetailMaster));
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
									label={hospitalAnnouncedPriceDetailMasterName.name}
									itemName="nameLike"
									value={filter.nameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												nameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={hospitalAnnouncedPriceDetailMasterName.unitName}
									itemName="unitNameLike"
									value={filter.unitNameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												unitNameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={hospitalAnnouncedPriceDetailMasterName.runningCode}
									itemName="runningCodeLike"
									value={filter.runningCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												runningCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
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
												setHospitalAnnouncedPriceDetailMasterFilter({
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
							dispatch(fetchCourseList(HospitalAnnouncedPriceDetailMaster));
						}}
					/>
				}
				AddLabel="เพิ่ม Master ราคาประกาศ"
				TotalItems={HospitalAnnouncedPriceDetailMaster.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={HospitalAnnouncedPriceDetailMaster.grid.data}
						columns={GetColumns(router)}
						page={HospitalAnnouncedPriceDetailMaster.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...HospitalAnnouncedPriceDetailMaster,
									grid: {
										...HospitalAnnouncedPriceDetailMaster.grid,
										page,
									},
								})
							);
						}}
					/>
				}
				AddFunction={() =>
					router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceDetailMaster.add)
				}
			/>
		</div>
	);
}
