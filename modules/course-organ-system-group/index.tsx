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
import { modelCourseOrganSystemGroup } from "./redux/model";
import { setCourseOrganSystemGroupFilter } from "./redux";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function CourseOrganSystemGroup() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseOrganSystemGroup, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			courseOrganSystemGroup: state.courseOrganSystemGroup,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(courseOrganSystemGroup));
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseItemInput notForm label="ค้นหา" onPressEnter={() => {}} />
						}
						handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {}}
					/>
				}
				AddLabel="เพิ่ม Course organ system group"
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
							dispatch(fetchCourseList(courseOrganSystemGroup));
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
