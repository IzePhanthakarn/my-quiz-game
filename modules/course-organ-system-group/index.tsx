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
import { GetColumns } from "./columns/grid";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import {
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
	const { courseOrganSystemGroup, isOpen, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			courseOrganSystemGroup: state.courseOrganSystemGroup,
			filter: state.courseOrganSystemGroup.filter,
		}),
		shallowEqual
	);

	const search = () => {
		dispatch(
			fetchCourseList({
				...courseOrganSystemGroup,
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
							<div className="flex space-x-2">
								<BaseItemInput
									notForm
									label={courseOrganSystemGroupName.courseCategory}
									itemName="courseCategoryLike"
									value={filter.courseCategoryLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseOrganSystemGroupFilter({
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
									label={courseOrganSystemGroupName.organSystemGroup}
									itemName="organSystemGroupLike"
									value={filter.organSystemGroupLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseOrganSystemGroupFilter({
												...filter,
												organSystemGroupLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseOrganSystemGroupName.organSystemNo}
									itemName="organSystemNoLike"
									value={filter.organSystemNoLike}
									onChangeFunction={(e) => {
										dispatch(
											setCourseOrganSystemGroupFilter({
												...filter,
												organSystemNoLike: e.target.value,
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
												setCourseOrganSystemGroupFilter({
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
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							search();
						}}
						clearFilter={() => {
							dispatch(
								setCourseOrganSystemGroupFilter(
									modelCourseOrganSystemGroup.filter
								)
							);
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.add)}
			/>
		</div>
	);
}
