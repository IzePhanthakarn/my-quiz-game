"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/grid";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import {
	CourseOrganSystemGroupFilter,
	modelCourseOrganSystemGroup,
	modelCourseOrganSystemGroupFilter,
} from "./redux/model";
import { setCourseOrganSystemGroupFilter } from "./redux";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { courseOrganSystemGroupName } from "./interfaces/name";

export default function CourseOrganSystemGroup() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseOrganSystemGroup, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			courseOrganSystemGroup: state.courseOrganSystemGroup,
			filter: state.courseOrganSystemGroup.filter,
		}),
		shallowEqual
	);

	const [tmpFilter, setTmpFilter] = useState<CourseOrganSystemGroupFilter>(
		modelCourseOrganSystemGroupFilter
	);

	const search = () => {
		const newFilter = { ...filter, ...tmpFilter };
		dispatch(setCourseOrganSystemGroupFilter(newFilter));
		dispatch(
			fetchCourseList({
				...courseOrganSystemGroup,
				filter: newFilter,
				grid: {
					...courseOrganSystemGroup.grid,
					page: {
						...courseOrganSystemGroup.grid.page,
						pageNumber: 0,
					},
				},
			})
		);
	};

	useEffect(() => {
		setTmpFilter(modelCourseOrganSystemGroupFilter);
		dispatch(
			setCourseOrganSystemGroupFilter(modelCourseOrganSystemGroupFilter)
		);
		dispatch(
			fetchCourseList({
				...courseOrganSystemGroup,
				filter: modelCourseOrganSystemGroupFilter,
			})
		);
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
									label={courseOrganSystemGroupName.courseCategory}
									itemName="courseCategoryLike"
									value={tmpFilter.courseCategoryLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											courseCategoryLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseOrganSystemGroupName.organSystemGroup}
									itemName="organSystemGroupLike"
									value={tmpFilter.organSystemGroupLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											organSystemGroupLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseOrganSystemGroupName.organSystemNo}
									itemName="organSystemNoLike"
									value={tmpFilter.organSystemNoLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											organSystemNoLike: e.target.value,
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
				AddLabel="เพิ่มหมวดหมู่อวัยวะ"
				TotalItems={courseOrganSystemGroup.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={courseOrganSystemGroup.grid.data}
						columns={GetColumns(router)}
						page={courseOrganSystemGroup.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...courseOrganSystemGroup,
									grid: { ...courseOrganSystemGroup.grid, page },
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
				// 			search();
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(
				// 				setCourseOrganSystemGroupFilter(
				// 					modelCourseOrganSystemGroup.filter
				// 				)
				// 			);
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.add)}
			/>
		</div>
	);
}
