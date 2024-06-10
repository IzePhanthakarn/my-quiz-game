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
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { LINKS } from "../../constants/links";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
			rows: state.clinic.grid,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(initClinicGrid());
	}, []);

	return (
		<Column>
			<Grid container rowSpacing={3} spacing={5} className="pb-5">
				<Grid item sm={12} md={6}>
					<p className="font-bold text-2xl leading-[48px]">คลินิค</p>
					<p className="leading-[18.75px]">คลินิค</p>
				</Grid>
				<Grid item sm={12} md={6} className="content-end text-right">
					<div>
						<Link key={LINKS.CLINIC.add} href={LINKS.CLINIC.add}>
							<Button variant="contained" startIcon={<AddIcon />}>
								เพิ่มคลินิค
							</Button>
						</Link>
					</div>
				</Grid>
			</Grid>
			<Column className="bg-white p-4">
				<div className="flex">
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
				</div>
				<BaseGrid rows={rows} columns={columns} />
			</Column>
		</Column>
	);
}
