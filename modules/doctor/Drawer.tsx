import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { IsActive } from "@/constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { setDoctorFilter } from "./redux";

export default function Drawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.doctor.doctorFilter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDoctorType"
					label="ประเภทแพทย์"
					checked={filter.checkDoctorType}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkDoctorType: !filter.checkDoctorType,
								doctorTypeLike: "",
							})
						)
					}
				/>
				{filter.checkDoctorType && (
					<BaseItemInput
						itemName="doctorTypeLike"
						value={filter.doctorTypeLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									doctorTypeLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDoctorCode"
					label="รหัสแพทย์"
					checked={filter.checkDoctorCode}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkDoctorCode: !filter.checkDoctorCode,
								doctorCodeLike: "",
							})
						)
					}
				/>
				{filter.checkDoctorCode && (
					<BaseItemInput
						itemName="doctorCodeLike"
						value={filter.doctorCodeLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									doctorCodeLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkFirstName"
					label="ชื่อแพทย์"
					checked={filter.checkFirstName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkFirstName: !filter.checkFirstName,
								firstnameLike: "",
							})
						)
					}
				/>
				{filter.checkFirstName && (
					<BaseItemInput
						itemName="firstnameLike"
						value={filter.firstnameLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									firstnameLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkLastName"
					label="นามสกุลแพทย์"
					checked={filter.checkLastName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkLastName: !filter.checkLastName,
								lastnameLike: "",
							})
						)
					}
				/>
				{filter.checkLastName && (
					<BaseItemInput
						itemName="lastnameLike"
						value={filter.lastnameLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									lastnameLike: e.target.value,
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
							setDoctorFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setDoctorFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setDoctorFilter({
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
