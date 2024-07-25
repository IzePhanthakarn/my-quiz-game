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
import { setDiplomaFilter } from "./redux";
import { IsActive } from "@/constants/constants";

export default function Drawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.diploma.diplomaFilter,
		}),
		shallowEqual
	);

	return (
		<Column className="space-y-4">
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<FormItemCheckbox
					itemName="checkDiplomaType"
					label="รหัสประกาศนียบัตร"
					checked={filter.checkDiplomaType}
					labelPosition={FormItemPosition.RIGHT}
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
					<FormItemInput
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
			</Column>
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<FormItemCheckbox
					itemName="checkDiplomaName"
					label="ชื่อประกาศนียบัตร"
					checked={filter.checkDiplomaName}
					labelPosition={FormItemPosition.RIGHT}
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
					<FormItemInput
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
			</Column>
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<FormItemCheckboxFilterGroup
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
			</Column>
		</Column>
	);
}
