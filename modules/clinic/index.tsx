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
import Button from "@mui/material/Button";
import BaseDrawer from "@/components/BaseDrawer";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import FilterForm from "@/components/BaseDrawer/contents/filter-form/index";
import { setIsOpenDialog } from "@/components/BaseDialog/redux";
import BaseDialog from "@/components/BaseDialog";
import RequiredDoc from "@/components/BaseDialog/contents/required-doc";
import { modelClinicForm } from "./redux/infomation/model";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows, isOpen, isOpenModal } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
			rows: state.clinic.grid,
			isOpen: state.drawer.isOpen,
			isOpenModal: state.dialog.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		// dispatch(
		// 	setFieldValue({
		// 		key: "formData",
		// 		value: { ...modelClinicForm },
		// 	})
		// );

		dispatch(initClinicGrid());
	}, []);

	return (
		<div className="w-full flex flex-col relative">
			<div className="flex">
				<TextField
					value={form.clinicCode}
					onChange={(e) =>
						dispatch(
							setFieldValue({
								key: "formData",
								value: { ...form, clinicCode: e.target.value },
							})
						)
					}
				/>
				<TextField
					value={form.clinicName}
					onChange={(e) =>
						dispatch(
							setFieldValue({
								key: "formData",
								value: { ...form, clinicName: e.target.value },
							})
						)
					}
				/>
				<Button onClick={() => dispatch(setIsOpenDrawer(true))}>
					{isOpen ? "true" : "false"}
				</Button>
				<Button onClick={() => dispatch(setIsOpenDialog(true))}>
					{isOpenModal ? "trueModal" : "falseModal"}
				</Button>
			</div>
			<BaseGrid rows={rows} columns={columns} label={"ทดสอบหัวข้อ"} />
			<BaseDrawer
				isOpen={isOpen}
				content={<FilterForm />}
				label={"ทดสอบ Drawer"}
			/>
			<BaseDialog
				isOpen={isOpenModal}
				content={<RequiredDoc />}
				label={"ทดสอบ Dialog"}
			/>
		</div>
	);
}
