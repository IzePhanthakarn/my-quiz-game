import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setOrganSystemWpiFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.organSystemWpi.filter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkOrganSystemNo"
					label="Organ SystemNo"
					checked={filter.checkOrganSystemNo}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setOrganSystemWpiFilter({
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
									setOrganSystemWpiFilter({
										...filter,
										organSystemNoLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDescription"
					label="Description"
					checked={filter.checkDescription}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setOrganSystemWpiFilter({
								...filter,
								checkDescription: !filter.checkDescription,
							})
						)
					}
				/>
				{filter.checkDescription && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="descriptionLike"
							value={filter.descriptionLike}
							onChangeFunction={(e) => {
								dispatch(
									setOrganSystemWpiFilter({
										...filter,
										descriptionLike: e.target.value,
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
							setOrganSystemWpiFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setOrganSystemWpiFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setOrganSystemWpiFilter({
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
