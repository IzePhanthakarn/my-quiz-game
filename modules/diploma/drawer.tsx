import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormItemCheckbox, FormItemInput } from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setDiplomaFilter } from "./redux";

export default function Drawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.diploma.diplomaFilter,
		}),
		shallowEqual
	);

	return (
		<>
			<Column className="space-y-4">
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkClinicCode"
						label="รหัสประกาศนียบัตร"
						checked={filter.checkDiplomaType}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setDiplomaFilter({
									...filter,
									checkDiplomaType: !filter.checkDiplomaType,
								})
							)
						}
					/>
					{filter.checkDiplomaType && (
						<div className=" pt-1">
							<FormItemInput
								itemName="clinicCode"
								value={filter.diplomaType}
								onChangeFunction={(e) => {
									dispatch(
										setDiplomaFilter({
											...filter,
											diplomaType: e.target.value,
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
						label="ชื่อประกาศนียบัตร"
						checked={filter.checkDiplomaName}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setDiplomaFilter({
									...filter,
									checkDiplomaName: !filter.checkDiplomaName,
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
					{filter.checkDiplomaName && (
						<FormItemInput
							itemName="clinicName"
							value={filter.diplomaName}
							onChangeFunction={(e) => {
								dispatch(
									setDiplomaFilter({
										...filter,
										diplomaName: e.target.value,
									})
								);
							}}
						/>
					)}
				</Column>
			</Column>
		</>
	);
}
