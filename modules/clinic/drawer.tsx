import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicFilter } from "./redux";
import { IsActive } from "@/constants/constants";
import { toggleIsActive } from "@/utils";
import {
	FormItemCheckbox,
	FormItemCheckboxFilterGroup,
	FormItemInput,
} from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";

export default function Drawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.clinic.clinicFilter,
		}),
		shallowEqual
	);

	return (
		<>
			<Column className="space-y-4">
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkClinicCode"
						label="รหัสคลินิค"
						checked={filter.checkClinicCode}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setClinicFilter({
									...filter,
									checkClinicCode: !filter.checkClinicCode,
								})
							)
						}
					/>
					{filter.checkClinicCode && (
						<div className=" pt-1">
							<FormItemInput
								itemName="clinicCode"
								value={filter.clinicCode}
								onChangeFunction={(e) => {
									dispatch(
										setClinicFilter({
											...filter,
											clinicCode: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkClinicName"
						label="ชื่อคลินิค"
						checked={filter.checkClinicName}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setClinicFilter({
									...filter,
									checkClinicName: !filter.checkClinicName,
								})
							)
						}
						// rules={[
						// 	{
						// 		required: true,
						// 		message: "Please input your Clinic Code!",
						// 	},
						// ]}
					/>
					{filter.checkClinicName && (
						<FormItemInput
							itemName="clinicName"
							value={filter.clinicName}
							onChangeFunction={(e) => {
								dispatch(
									setClinicFilter({
										...filter,
										clinicName: e.target.value,
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
								setClinicFilter({
									...filter,
									checkIsActive: !filter.checkIsActive,
									isActive: undefined,
								})
							);
						}}
						subInputValue={filter.isActive}
						onClickSubInputYFunction={() => {
							dispatch(
								setClinicFilter({
									...filter,
									isActive: IsActive.Y,
								})
							);
						}}
						onClickSubInputNFunction={() => {
							dispatch(
								setClinicFilter({
									...filter,
									isActive: IsActive.N,
								})
							);
						}}
					/>
				</Column>
			</Column>
		</>
	);
}
