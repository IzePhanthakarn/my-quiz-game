"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { grid } from "./columns/grid";
import { fetchCourseList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelCourseCertificate } from "./redux/model";
import { setCourseCertificateFilter } from "./redux";

export default function CourseCertificate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseCertificate, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.loading.isLoading,
			courseCertificate: state.courseCertificate,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchCourseList(courseCertificate));
	}, []);

	return (
		<div>
			<MasterDataLayout
				AddLabel="เพิ่ม Course Certificate"
				Header="Course"
				TotalItems={courseCertificate.grid.page.totalData}
				SearchButtonFunction={() => {}}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				Grid={
					<BaseGrid
						rows={courseCertificate.grid.data}
						columns={grid}
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
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							dispatch(fetchCourseList(courseCertificate));
						}}
						clearFilter={() => {
							dispatch(
								setCourseCertificateFilter(modelCourseCertificate.filter)
							);
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.CATEGORY_CERTIFICATE.add)}
			/>
		</div>
	);
}
