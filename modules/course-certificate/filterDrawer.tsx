import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormItemCheckbox, FormItemInput } from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseCertificateFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import _ from "lodash";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseCertificate.filter,
		}),
		shallowEqual
	);

	return (
		<>
			<Column className="space-y-4">
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkCourseCategory"
						label="Course Category"
						checked={filter.checkCourseCategory}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setCourseCertificateFilter({
									...filter,
									checkCourseCategory: !filter.checkCourseCategory,
								})
							)
						}
					/>
					{filter.checkCourseCategory && (
						<div className=" pt-1">
							<FormItemInput
								itemName="courseCategoryLike"
								value={filter.courseCategoryLike}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateFilter({
											...filter,
											courseCategoryLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkSsoCourseCode"
						label="Sso CourseCode"
						checked={filter.checkSsoCourseCode}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setCourseCertificateFilter({
									...filter,
									checkSsoCourseCode: !filter.checkSsoCourseCode,
								})
							)
						}
					/>
					{filter.checkSsoCourseCode && (
						<div className=" pt-1">
							<FormItemInput
								itemName="ssoCourseCodeLike"
								value={filter.ssoCourseCodeLike}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateFilter({
											...filter,
											ssoCourseCodeLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkCourseDescription"
						label="Course Description"
						checked={filter.checkCourseDescription}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setCourseCertificateFilter({
									...filter,
									checkCourseDescription: !filter.checkCourseDescription,
								})
							)
						}
					/>
					{filter.checkCourseDescription && (
						<div className=" pt-1">
							<FormItemInput
								itemName="courseDescriptionLike"
								value={filter.courseDescriptionLike}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateFilter({
											...filter,
											courseDescriptionLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkCourseYear"
						label="Course Year"
						checked={filter.checkCourseYear}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setCourseCertificateFilter({
									...filter,
									checkCourseYear: !filter.checkCourseYear,
								})
							)
						}
					/>
					{filter.checkCourseYear && (
						<div className=" pt-1">
							<FormItemInput
								itemName="courseYearLike"
								value={filter.courseYearLike}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateFilter({
											...filter,
											courseYearLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkIsActive"
						label="สถานะการลบข้อมูล"
						checked={filter.checkIsActive}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setCourseCertificateFilter({
									...filter,
									checkIsActive: !filter.checkIsActive,
									isActive: undefined,
								})
							);
						}}
					/>
					{filter.checkIsActive && (
						<div className=" pt-1 ml-4">
							<FormItemCheckbox
								itemName="isActive"
								label="ไม่ลบข้อมูล"
								checked={_.trim(filter.isActive) === IsActive.Y}
								labelPosition={FormItemPosition.RIGHT}
								onClickFunction={() =>
									dispatch(
										setCourseCertificateFilter({
											...filter,
											isActive: IsActive.Y,
										})
									)
								}
							/>
							<FormItemCheckbox
								itemName="isActive"
								label="ลบข้อมูล"
								checked={_.trim(filter.isActive) === IsActive.N}
								labelPosition={FormItemPosition.RIGHT}
								onClickFunction={() =>
									dispatch(
										setCourseCertificateFilter({
											...filter,
											isActive: IsActive.N,
										})
									)
								}
							/>
						</div>
					)}
				</Column>
			</Column>
		</>
	);
}
