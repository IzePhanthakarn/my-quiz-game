"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/manipulate";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { setCourseCategoryFilter } from "./redux";
import { modelCourseCategory } from "./redux/model";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { courseCategoryName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setOrganSystemWpiFilter } from "../organ-system-wpi/redux";

export default function CourseManipulate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { course, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			course: state.courseCategory,
			filter: state.courseCategory.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(course));
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
									label={courseCategoryName.categoryDescription}
									itemName="categoryDescriptionLike"
									value={filter.categoryDescriptionLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseCategoryFilter({
												...filter,
												categoryDescriptionLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(fetchCourseList(course));
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
											setCourseCategoryFilter({
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
							dispatch(fetchCourseList(course));
						}}
					/>
				}
				AddLabel="เพิ่มคอร์สอบอบรม"
				TotalItems={course.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={course.grid.data}
						columns={GetColumns(router)}
						page={course.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({ ...course, grid: { ...course.grid, page } })
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
				// 			dispatch(fetchCourseList(course));
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(setCourseCategoryFilter(modelCourseCategory.filter));
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.COURSE_CATEGORY.add)}
			/>
		</div>
	);
}
