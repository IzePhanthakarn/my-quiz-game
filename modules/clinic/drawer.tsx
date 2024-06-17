import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicFilter } from "./redux";
import { IsActive, IsDelete } from "@/constants/constants";
import { toggleIsActive, toggleIsDelete } from "@/utils";

export default function Drawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.clinic.clinicFilter,
		}),
		shallowEqual
	);
	return (
		<Column className="space-y-4">
			<Column className="border-2 border-[#DBE4F199] rounded-md">
				<FormControlLabel
					className="m-0"
					control={
						<Checkbox
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkClinicCode: !filter.checkClinicCode,
									})
								)
							}
						/>
					}
					checked={filter.checkClinicCode}
					label="รหัสคลินิค"
				/>
				{filter.checkClinicCode && (
					<div className="p-4 pt-1">
						<TextField
							className="w-full"
							value={filter.clinicCode}
							onChange={(e) => {
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
			<Column className="border-2 border-[#DBE4F199] rounded-md">
				<FormControlLabel
					className="m-0"
					control={
						<Checkbox
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkClinicName: !filter.checkClinicName,
									})
								)
							}
						/>
					}
					checked={filter.checkClinicName}
					label="ชื่อคลินิค"
				/>
				{filter.checkClinicName && (
					<div className="p-4 pt-1">
						<TextField
							className="w-full"
							value={filter.clinicName}
							onChange={(e) => {
								dispatch(
									setClinicFilter({
										...filter,
										clinicName: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</Column>
			<Column className="border-2 border-[#DBE4F199] rounded-md">
				<FormControlLabel
					className="m-0"
					control={
						<Checkbox
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkStatus: !filter.checkStatus,
									})
								)
							}
						/>
					}
					checked={filter.checkStatus}
					label="สถานะการลบข้อมูล"
				/>
				{filter.checkStatus && (
					<Column>
						<FormControlLabel
							className="m-0 ml-3"
							control={
								<Checkbox
									onClick={() => {
										dispatch(
											setClinicFilter({
												...filter,
												isDelete: toggleIsDelete(filter.isDelete),
											})
										);
									}}
								/>
							}
							checked={filter.isDelete !== IsDelete.Y}
							label="ลบ"
						/>
						<FormControlLabel
							className="m-0 ml-3"
							control={
								<Checkbox
									onClick={() =>
										dispatch(
											setClinicFilter({
												...filter,
												isActive: toggleIsActive(filter.isActive),
											})
										)
									}
								/>
							}
							checked={filter.isActive !== IsActive.N}
							label="ไม่ลบ"
						/>
					</Column>
				)}
			</Column>
		</Column>
	);
}
