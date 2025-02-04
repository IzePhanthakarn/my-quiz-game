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
import { fetchCourseList } from "./service";
import { setCourseCategoryFilter } from "./redux";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { courseCategoryName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { CourseCategoryFilter, modelCourseCategoryFilter } from "./redux/model";

export default function CourseManipulate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { course, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			course: state.courseCategory,
			filter: state.courseCategory.filter,
		}),
		shallowEqual
	);

	const [tmpFilter, setTmpFilter] = useState<CourseCategoryFilter>(
		modelCourseCategoryFilter
	);

	const search = () => {
		const newFilter = { ...tmpFilter, ...tmpFilter };
		dispatch(setCourseCategoryFilter(newFilter));
		dispatch(
			fetchCourseList({
				...course,
				filter: newFilter,
				grid: {
					...course.grid,
					page: { ...course.grid.page, pageNumber: 0 },
				},
			})
		);
	};

	useEffect(() => {
		setTmpFilter(modelCourseCategoryFilter);
		dispatch(setCourseCategoryFilter(modelCourseCategoryFilter));
		dispatch(fetchCourseList({ ...course, filter: modelCourseCategoryFilter }));
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="grid grid-cols-4 gap-x-2 w-full">
								<BaseItemInput
									notForm
									label={courseCategoryName.categoryDescription}
									itemName="categoryDescriptionLike"
									value={tmpFilter.categoryDescriptionLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											categoryDescriptionLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										search();
									}}
								/>
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
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							search();
						}}
					/>
				}
				AddLabel="เพิ่มคอร์สอบรม"
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
								fetchCourseList({
									...course,
									grid: { ...course.grid, page },
								})
							);
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.COURSE_CATEGORY.add)}
			/>
		</div>
	);
}
