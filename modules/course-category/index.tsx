"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import _ from "lodash";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { FilterOutlined } from "wcf-component-lib/node_modules/@ant-design/icons";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { columns } from "./columns/manipulate";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";

export default function CourseManipulate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { course, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.loading.isLoading,
			course: state.courseCategory,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(course));
	}, []);

	return (
		<div>
			<MasterData
				AddLabel="เพิ่มคอร์ส"
				Header="Course"
				SubHeader="List Course"
				FilterTextField={<Input className="w-[300px]" />}
				FilterButton={
					<Button
						size="large"
						className="text-xl px-3 py-2"
						onClick={() => dispatch(setIsOpenDrawer(true))}
						icon={<FilterOutlined />}
					>
						ตัวกรอง
					</Button>
				}
				Grid={
					<BaseGrid
						rows={course.grid.data}
						columns={columns}
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
						content={<></>}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {}}
					/>
				}
				AddFunction={() => router.push(LINKS.CATEGORY_COURSE.add)}
			/>
		</div>
	);
}
