"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clinicPagination, initClinicGrid } from "./service";
import { setFieldValue } from "@/redux/slices/crud";
import { columns } from "./model";
import BaseGrid from "@/components/BaseGrid";
import Column from "@/components/Column";
import Row from "@/components/Row";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import Drawer from "./drawer";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { LINKS } from "@/constants/links";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BaseDrawer from "@/components/BaseDrawer";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows, isOpen, filter } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
			rows: state.clinic.grid,
			isOpen: state.drawer.isOpen,
			filter: state.clinic.clinicFilter,
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
			<div className=" bg-white p-4">
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
							e.key === "Enter" &&
							dispatch(
								initClinicGrid({
									...clinicPagination,
									data: { ...form },
								})
							)
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
				<BaseDrawer
					isOpen={isOpen}
					content={<Drawer />}
					isFilter
					confirmFuntion={() =>
						dispatch(
							initClinicGrid({
								...clinicPagination,
								data: { ...filter, clinicCodeName: "" },
							})
						)
					}
				/>
			</div>
		</Column>
	);
}
