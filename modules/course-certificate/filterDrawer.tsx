import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseCertificateFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseCertificate.filter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkCourseCategory"
					label="Course Category"
					checked={filter.checkCourseCategory}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkSsoCourseCode"
					label="Sso CourseCode"
					checked={filter.checkSsoCourseCode}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkCourseDescription"
					label="Course Description"
					checked={filter.checkCourseDescription}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkCourseYear"
					label="Course Year"
					checked={filter.checkCourseYear}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setCourseCertificateFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setCourseCertificateFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setCourseCertificateFilter({
								...filter,
								isActive: IsActive.N,
							})
						);
					}}
				/>
			</BaseColumn>
		</BaseColumn>
	);
}
