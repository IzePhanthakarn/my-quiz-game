"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { grid } from "./columns/grid";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./filterDrawer";
import { modelCourseOrganSystemGroup } from "./redux/model";
import { setCourseOrganSystemGroupFilter } from "./redux";

export default function CourseOrganSystemGroup() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseOrganSystemGroup, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.loading.isLoading,
			courseOrganSystemGroup: state.courseOrganSystemGroup,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(courseOrganSystemGroup));
	}, []);

	return (
		<div>
			<MasterData
				AddLabel="เพิ่มคอร์ส"
				Header="Course"
				SubHeader="List Course"
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				Grid={
					<BaseGrid
						rows={courseOrganSystemGroup.grid.data}
						columns={grid}
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
