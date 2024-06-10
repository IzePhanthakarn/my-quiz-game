"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
import { setFieldValue } from "@/redux/slices/crud";
import { columns } from "./model";
import BaseGrid from "@/components/BaseGrid";
import Column from "@/components/Column";
import Row from "@/components/Row";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BaseDrawer from "@/components/BaseDrawer";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import Drawer from "./drawer";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows, isOpen } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
			rows: state.clinic.grid,
			isOpen: state.drawer.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(initClinicGrid());
	}, []);

	return (
		<Column>
			<Column className="px-4 mb-4">
				<p className="font-bold text-2xl leading-[48px]">คลินิค</p>
				<Row className="justify-between  items-center">
					<p className="leading-[18.75px] w-full">คลินิค</p>
					<Row className="justify-end items-center space-x-4">
						<Button className="bg-[#2196F3] px-2.5 py-1 rounded-md text-white">
							<div className="flex items-center justify-center space-x-2">
								<img src="/icons/plus.svg" alt="logo" />
								<p className="text-[13px] w-full">เพิ่มข้อมูลคลินิค</p>
							</div>
						</Button>
						<MoreVertIcon className="cursor-pointer" />
					</Row>
				</Row>
			</Column>
			<Column className="bg-white p-4">
				<Row className="justify-between items-center">
					<TextField
						className="mb-[10px]"
						value={form.clinicCodeName}
						placeholder="ค้นหา"
						onChange={(e) =>
							dispatch(
								setFieldValue({
									key: "formData",
									value: { ...form, clinicCodeName: e.target.value },
								})
							)
						}
						onKeyDown={(e) =>
							e.key === "Enter" && dispatch(initClinicGrid(form.clinicCodeName))
						}
					/>
					<Button
						onClick={() => dispatch(setIsOpenDrawer(true))}
						className="w-[91px] h-[30px] px-2.5 py-1.5 border-2 border-solid border-[#2196F380]"
					>
						<div className="flex items-center justify-center space-x-2">
							<img src="/icons/filter.svg" alt="logo" />
							<p className="text-[13px] whitespace-nowrap">ตัวกรอง</p>
						</div>
					</Button>
				</Row>
				<BaseGrid rows={rows} columns={columns} />
				<BaseDrawer isOpen={isOpen} content={<Drawer />} />
			</Column>
		</Column>
	);
}
