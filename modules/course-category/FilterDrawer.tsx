import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setCourseCategoryFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.courseCategory.filter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkClinicCode"
					label="Category Description"
					checked={filter.checkCategoryDescriptionLike}
					labelPosition={BaseFormItemPosition.RIGHT}
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
						<BaseItemInput
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
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
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
			</BaseColumn>
		</BaseColumn>
	);
}
