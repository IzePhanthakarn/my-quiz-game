import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseOrganSystemGroupFilter } from "./redux";
import { IsActive } from "../../constants/constants";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseOrganSystemGroup.filter,
		}),
		shallowEqual
	);

	return (
		<Column className="space-y-4">
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkCourseCategory"
					label="Course Category"
					checked={filter.checkCourseCategory}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
				<BaseItemCheckbox
					itemName="checkOrganSystemGroup"
					label="Organ System Group"
					checked={filter.checkOrganSystemGroup}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setCourseOrganSystemGroupFilter({
								...filter,
								checkOrganSystemGroup: !filter.checkOrganSystemGroup,
							})
						)
					}
				/>
				{filter.checkOrganSystemGroup && (
					<div className=" pt-1">
						<BaseItemInput
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
						/>
					</div>
				)}
			</Column>
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkOrganSystemNo"
					label="Organ System No"
					checked={filter.checkOrganSystemNo}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setCourseOrganSystemGroupFilter({
								...filter,
								checkOrganSystemNo: !filter.checkOrganSystemNo,
							})
						)
					}
				/>
				{filter.checkOrganSystemNo && (
					<div className=" pt-1">
						<BaseItemInput
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
						/>
					</div>
				)}
			</Column>
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setCourseOrganSystemGroupFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setCourseOrganSystemGroupFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setCourseOrganSystemGroupFilter({
								...filter,
								isActive: IsActive.N,
							})
						);
					}}
				/>
			</Column>
		</Column>
	);
}
