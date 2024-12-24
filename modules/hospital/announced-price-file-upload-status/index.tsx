"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { GetColumns } from "./columns/grid";
import { fetchCourseList } from "./service";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { hospitalAnnouncedPriceFileUploadStatusName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ANNOUNCED_PRICE_FILE_UPLOAD_STATUS } from "@/components/MedDropDown/model";
import { setHospitalAnnouncedPriceFileUploadStatusFilter } from "../redux";
import _ from "lodash";
import { Hospital } from "../redux/models/hospitalModel";
import { modelHospitalAnnouncedPriceFileUploadStatus } from "./redux/model";

export default function HospitalAnnouncedPriceFileUploadStatus() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const queryHospitalWcfCodeLike = searchParams.get("hospitalWcfCodeLike");

	const { HospitalAnnouncedPriceFileUploadStatus, isOpen, isLoading, filter } =
		useSelector(
			(state: SliceModel) => ({
				isOpen: state.drawer.isOpen,
				isLoading: state.container.isLoading,
				HospitalAnnouncedPriceFileUploadStatus:
					state.hospital.hospitalAnnouncedPriceFileUploadStatus,
				filter: state.hospital.hospitalAnnouncedPriceFileUploadStatus.filter,
			}),
			shallowEqual
		);

	useEffect(() => {
		const initFilter: Hospital["hospitalAnnouncedPriceFileUploadStatus"]["filter"] =
			{
				...filter,
				hospitalWcfCodeLike: !_.isNull(queryHospitalWcfCodeLike)
					? queryHospitalWcfCodeLike
					: "",
			};
		dispatch(setHospitalAnnouncedPriceFileUploadStatusFilter(initFilter));
		dispatch(
			fetchCourseList({
				grid: modelHospitalAnnouncedPriceFileUploadStatus.grid,
				filter: initFilter,
			})
		);
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
										hospitalAnnouncedPriceFileUploadStatusName.hospitalWcfCode
									}
									itemName="hospitalWcfCodeLike"
									value={filter.hospitalWcfCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileUploadStatusFilter({
												...filter,
												hospitalWcfCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceFileUploadStatus)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={
										hospitalAnnouncedPriceFileUploadStatusName.announcedYear
									}
									itemName="announcedYearLike"
									value={filter.announcedYearLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileUploadStatusFilter({
												...filter,
												announcedYearLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceFileUploadStatus)
										);
									}}
								/>

								<div className="w-[240px]">
									<MedDropDown
										notForm
										label={hospitalAnnouncedPriceFileUploadStatusName.status}
										option={DROPDOWN_ANNOUNCED_PRICE_FILE_UPLOAD_STATUS}
										value={filter.statusLike}
										itemName="statusLike"
										getValue={(value) => {
											dispatch(
												setHospitalAnnouncedPriceFileUploadStatusFilter({
													...filter,
													statusLike: value,
												})
											);
										}}
									/>
								</div>
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							dispatch(fetchCourseList(HospitalAnnouncedPriceFileUploadStatus));
						}}
					/>
				}
				AddButton={<></>}
				AddLabel="เพิ่มประเภทราคาประกาศ"
				TotalItems={HospitalAnnouncedPriceFileUploadStatus.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={HospitalAnnouncedPriceFileUploadStatus.grid.data}
						columns={GetColumns(router)}
						page={HospitalAnnouncedPriceFileUploadStatus.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...HospitalAnnouncedPriceFileUploadStatus,
									grid: {
										...HospitalAnnouncedPriceFileUploadStatus.grid,
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
				// 			dispatch(fetchCourseList(HospitalAnnouncedPriceFileUploadStatus));
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(
				// 				setHospitalAnnouncedPriceFileUploadStatusFilter(modelHospitalAnnouncedPriceFileUploadStatus.filter)
				// 			);
				// 		}}
				// 	/>
				// }
				AddFunction={
					() => {}
					// router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceFileUploadStatus.add)
				}
			/>
		</div>
	);
}
