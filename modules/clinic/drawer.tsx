import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicFilter } from "./redux";
import { IsActive, IsDelete } from "@/constants/constants";
import { toggleIsActive, toggleIsDelete } from "@/utils";
import { Switch, Button, Checkbox, Form, Input } from "antd";
import { ClinicFilter } from "./redux/filter/model";

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
				<Column className="border-2 border-[#DBE4F199] rounded-md">
					<Form.Item<ClinicFilter> className="m-0 px-4 pt-1">
						<Checkbox
							checked={filter.checkClinicCode}
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkClinicCode: !filter.checkClinicCode,
									})
								)
							}
						></Checkbox>
						<label className="ml-2">รหัสคลินิค</label>
					</Form.Item>

					{filter.checkClinicCode && (
						<div className="p-4 pt-1">
							<Form.Item<ClinicFilter> className="mb-0" name="clinicCode">
								<Input
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										dispatch(
											setClinicFilter({
												...filter,
												clinicCode: e.target.value,
											})
										);
									}}
									value={filter.clinicCode}
									maxLength={4}
								/>
							</Form.Item>
						</div>
					)}
				</Column>
				<Column className="border-2 border-[#DBE4F199] rounded-md">
					<Form.Item<ClinicFilter> className="m-0 px-4 pt-1">
						<Checkbox
							checked={filter.checkClinicName}
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkClinicName: !filter.checkClinicName,
									})
								)
							}
						></Checkbox>
						<label className="ml-2">ชื่อคลินิค</label>
					</Form.Item>

					{filter.checkClinicName && (
						<div className="p-4 pt-1">
							<Form.Item<ClinicFilter> className="mb-0" name="clinicName">
								<Input
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										dispatch(
											setClinicFilter({
												...filter,
												clinicName: e.target.value,
											})
										);
									}}
									value={filter.clinicName}
									maxLength={4}
								/>
							</Form.Item>
						</div>
					)}
				</Column>
				<Column className="border-2 border-[#DBE4F199] rounded-md">
					<Form.Item<ClinicFilter> className="m-0 px-4 pt-1">
						<Checkbox
							checked={filter.checkStatus}
							onClick={() =>
								dispatch(
									setClinicFilter({
										...filter,
										checkStatus: !filter.checkStatus,
									})
								)
							}
						></Checkbox>
						<label className="ml-2">ชื่อคลินิค</label>
					</Form.Item>
					{filter.checkStatus && (
						<Column>
							<Form.Item<ClinicFilter> className="m-0 ml-3 px-4 pt-1">
								<Checkbox
									checked={filter.isDelete !== IsDelete.Y}
									onClick={() =>
										dispatch(
											setClinicFilter({
												...filter,
												isDelete: toggleIsDelete(filter.isDelete),
											})
										)
									}
								></Checkbox>
								<label className="ml-2">ลบ</label>
							</Form.Item>

							<Form.Item<ClinicFilter> className="m-0 ml-3 px-4 pt-1">
								<Checkbox
									checked={filter.isActive !== IsActive.N}
									onClick={() =>
										dispatch(
											setClinicFilter({
												...filter,
												isActive: toggleIsActive(filter.isActive),
											})
										)
									}
								></Checkbox>
								<label className="ml-2">ไม่ลบ</label>
							</Form.Item>
						</Column>
					)}
				</Column>
			</Column>
		</>
	);
}
