import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormItemCheckbox, FormItemInput } from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseOrganSystemGroupFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import _ from "lodash";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseOrganSystemGroup.filter,
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
								setCourseOrganSystemGroupFilter({
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
										setCourseOrganSystemGroupFilter({
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
						itemName="checkIsActive"
						label="สถานะการลบข้อมูล"
						checked={filter.checkIsActive}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setCourseOrganSystemGroupFilter({
									...filter,
									checkIsActive: !filter.checkIsActive,
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
										setCourseOrganSystemGroupFilter({
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
										setCourseOrganSystemGroupFilter({
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
