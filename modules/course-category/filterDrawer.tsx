import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	FormItemCheckbox,
	FormItemCheckboxFilterGroup,
	FormItemInput,
} from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseCategoryFilter } from "./redux";
import { IsActive } from "../../constants/constants";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseCategory.filter,
		}),
		shallowEqual
	);

	return (
		<Column className="space-y-4">
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<FormItemCheckbox
					itemName="checkClinicCode"
					label="Category Description"
					checked={filter.checkCategoryDescriptionLike}
					labelPosition={FormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setCourseCategoryFilter({
								...filter,
								checkCategoryDescriptionLike:
									!filter.checkCategoryDescriptionLike,
							})
						)
					}
				/>
				{filter.checkCategoryDescriptionLike && (
					<div className=" pt-1">
						<FormItemInput
							itemName="categoryDescriptionLike"
							value={filter.categoryDescriptionLike}
							onChangeFunction={(e) => {
								dispatch(
									setCourseCategoryFilter({
										...filter,
										categoryDescriptionLike: e.target.value,
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
							setCourseCategoryFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setCourseCategoryFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setCourseCategoryFilter({
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
