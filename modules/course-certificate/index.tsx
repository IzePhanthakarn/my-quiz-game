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
import { setCourseCertificateFilter } from "./redux";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { courseCertificateName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { modelCourseCertificateFilter } from "./redux/model";

export default function CourseCertificate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseCertificate, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			courseCertificate: state.courseCertificate,
			filter: state.courseCertificate.filter,
		}),
		shallowEqual
	);

	const search = () => {
		dispatch(
			fetchCourseList({
				...courseCertificate,
				grid: {
					...courseCertificate.grid,
					page: { ...courseCertificate.grid.page, pageNumber: 0 },
				},
			})
		);
	};

	useEffect(() => {
		dispatch(setCourseCertificateFilter(modelCourseCertificateFilter));
		dispatch(
			fetchCourseList({
				...courseCertificate,
				filter: modelCourseCertificateFilter,
				grid: {
					...courseCertificate.grid,
					page: { ...courseCertificate.grid.page, pageNumber: 0 },
				},
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
									label={courseCertificateName.courseCategory}
									itemName="courseCategoryLike"
									value={filter.courseCategoryLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseCertificateFilter({
												...filter,
												courseCategoryLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseCertificateName.ssoCourseCode}
									itemName="ssoCourseCodeLike"
									value={filter.ssoCourseCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseCertificateFilter({
												...filter,
												ssoCourseCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseCertificateName.courseDescription}
									itemName="courseDescriptionLike"
									value={filter.courseDescriptionLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseCertificateFilter({
												...filter,
												courseDescriptionLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										search();
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
												setCourseCertificateFilter({
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
							search();
						}}
					/>
				}
				AddLabel="เพิ่มใบรับรองหลักสูตร"
				TotalItems={courseCertificate.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={courseCertificate.grid.data}
						columns={GetColumns(router)}
						page={courseCertificate.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...courseCertificate,
									grid: { ...courseCertificate.grid, page },
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
				// 			search()
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(
				// 				setCourseCertificateFilter(modelCourseCertificate.filter)
				// 			);
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.COURSE_CERTIFICATE.add)}
			/>
		</div>
	);
}
