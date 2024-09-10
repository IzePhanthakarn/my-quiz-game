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
import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

export default function CourseManipulate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { course, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			course: state.courseCategory,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<HeaderLayout
					// Header="Course Category"
					SearchButtonFunction={() => {}}
					FilterTextField={<BaseItemInput className="w-[300px]" />}
					FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				/>
			),
		});
	}, [dispatchLayout]);

	useEffect(() => {
		dispatch(fetchCourseList(course));
	}, []);

	return (
		<div>
			<MasterDataLayout
				AddLabel="เพิ่ม Course Category"
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
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							dispatch(fetchCourseList(course));
						}}
						clearFilter={() => {
							dispatch(setCourseCategoryFilter(modelCourseCategory.filter));
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.COURSE_CATEGORY.add)}
			/>
		</div>
	);
}
