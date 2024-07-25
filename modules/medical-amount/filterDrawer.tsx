import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	FormItemCheckbox,
	FormItemInput,
	FormItemCheckboxFilterGroup,
} from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setMedicalAmountFilter } from "./redux";
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
				<FormItemCheckbox
					itemName="checkCourseCategory"
					label="Course Category"
					checked={filter.checkCourseCategory}
					labelPosition={FormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
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
									setMedicalAmountFilter({
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
					itemName="checkOrganSystemGroup"
					label="Organ System Group"
					checked={filter.checkOrganSystemGroup}
					labelPosition={FormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkOrganSystemGroup: !filter.checkOrganSystemGroup,
							})
						)
					}
				/>
				{filter.checkOrganSystemGroup && (
					<div className=" pt-1">
						<FormItemInput
							itemName="organSystemGroupLike"
							value={filter.organSystemGroupLike}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
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
				<FormItemCheckbox
					itemName="checkOrganSystemNo"
					label="Organ System No"
					checked={filter.checkOrganSystemNo}
					labelPosition={FormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkOrganSystemNo: !filter.checkOrganSystemNo,
							})
						)
					}
				/>
				{filter.checkOrganSystemNo && (
					<div className=" pt-1">
						<FormItemInput
							itemName="organSystemNoLike"
							value={filter.organSystemNoLike}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
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
				<FormItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setMedicalAmountFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setMedicalAmountFilter({
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
