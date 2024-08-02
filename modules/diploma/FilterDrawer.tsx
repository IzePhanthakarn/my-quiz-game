import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setDiplomaFilter } from "./redux";
import { IsActive } from "@/constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.diploma.diplomaFilter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDiplomaType"
					label="รหัสประกาศนียบัตร"
					checked={filter.checkDiplomaType}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDiplomaFilter({
								...filter,
								checkDiplomaType: !filter.checkDiplomaType,
								diplomaTypeLike: "",
							})
						)
					}
				/>
				{filter.checkDiplomaType && (
					<BaseItemInput
						itemName="diplomaTypeLike"
						value={filter.diplomaTypeLike}
						onChangeFunction={(e) => {
							dispatch(
								setDiplomaFilter({
									...filter,
									diplomaTypeLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDiplomaName"
					label="ชื่อประกาศนียบัตร"
					checked={filter.checkDiplomaName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDiplomaFilter({
								...filter,
								checkDiplomaName: !filter.checkDiplomaName,
								diplomaNameLike: "",
							})
						)
					}
				/>
				{filter.checkDiplomaName && (
					<BaseItemInput
						itemName="diplomaNameLike"
						value={filter.diplomaNameLike}
						onChangeFunction={(e) => {
							dispatch(
								setDiplomaFilter({
									...filter,
									diplomaNameLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setDiplomaFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setDiplomaFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setDiplomaFilter({
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
