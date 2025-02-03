"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useState } from "react";
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
import {
	CourseCertificateFilter,
	modelCourseCertificateFilter,
} from "./redux/model";

export default function CourseCertificate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { courseCertificate, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			courseCertificate: state.courseCertificate,
			filter: state.courseCertificate.filter,
		}),
		shallowEqual
	);
	const [tmpFilter, setTmpFilter] = useState<CourseCertificateFilter>(
		modelCourseCertificateFilter
	);

	const search = () => {
		const newFilter = { ...filter, ...tmpFilter };
		dispatch(setCourseCertificateFilter(newFilter));
		dispatch(
			fetchCourseList({
				...courseCertificate,
				filter: newFilter,
				grid: {
					...courseCertificate.grid,
					page: { ...courseCertificate.grid.page, pageNumber: 0 },
				},
			})
		);
	};

	useEffect(() => {
		setTmpFilter(filter);
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
							<div className="grid grid-cols-4 gap-x-2 w-full">
								<BaseItemInput
									notForm
									label={courseCertificateName.courseCategory}
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
									label={courseCertificateName.ssoCourseCode}
									itemName="ssoCourseCodeLike"
									value={tmpFilter.ssoCourseCodeLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											ssoCourseCodeLike: e.target.value,
										});
									}}
									onPressEnter={() => {
										search();
									}}
								/>
								<BaseItemInput
									notForm
									label={courseCertificateName.courseDescription}
									itemName="courseDescriptionLike"
									value={tmpFilter.courseDescriptionLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											courseDescriptionLike: e.target.value,
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
				AddFunction={() => router.push(LINKS.COURSE_CERTIFICATE.add)}
			/>
		</div>
	);
}
