import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicFilter } from "./redux";
import { IsActive, IsDelete } from "@/constants/constants";
import { toggleIsActive, toggleIsDelete } from "@/utils";
import FormItemCheckbox from "../../components/FormItemCheckbox";
import FormItemInput from "../../components/FormItemInput";
import { FormItemCheckboxPosition } from "../../components/FormItemCheckbox/constants/constants";

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
						labelPosition={FormItemCheckboxPosition.RIGHT}
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
								maxLength={4}
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
						labelPosition={FormItemCheckboxPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setClinicFilter({
									...filter,
									checkClinicName: !filter.checkClinicName,
								})
							)
						}
					/>
					{filter.checkClinicName && (
						<FormItemInput
							itemName="clinicName"
							value={filter.clinicName}
							maxLength={4}
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
					<FormItemCheckbox
						itemName="checkStatus"
						label="สถานะการลบข้อมูล"
						checked={filter.checkStatus}
						labelPosition={FormItemCheckboxPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setClinicFilter({
									...filter,
									checkStatus: !filter.checkStatus,
								})
							)
						}
					/>
					{filter.checkStatus && (
						<Column>
							<div className="ml-5">
								<FormItemCheckbox
									itemName="isDelete"
									label="ลบ"
									checked={filter.isDelete !== IsDelete.Y}
									labelPosition={FormItemCheckboxPosition.RIGHT}
									onClickFunction={() =>
										dispatch(
											setClinicFilter({
												...filter,
												isDelete: toggleIsDelete(filter.isDelete),
											})
										)
									}
								/>
							</div>
							<div className="ml-5">
								<FormItemCheckbox
									itemName="isActive"
									label="ไม่ลบ"
									checked={filter.isActive !== IsActive.N}
									labelPosition={FormItemCheckboxPosition.RIGHT}
									onClickFunction={() =>
										dispatch(
											setClinicFilter({
												...filter,
												isActive: toggleIsActive(filter.isActive),
											})
										)
									}
								/>
							</div>
						</Column>
					)}
				</Column>
			</Column>
		</>
	);
}
