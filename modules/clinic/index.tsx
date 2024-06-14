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
import { setIsLoading } from "@/components/Loading/redux";
import _ from "lodash";
import { setPagination } from "./redux";
import { GridSortModel } from "@mui/x-data-grid";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows, page, isOpen, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
			rows: state.clinic.grid.list,
			page: state.clinic.grid.page,
			isOpen: state.drawer.isOpen,
			filter: state.clinic.clinicFilter,
			isLoading: state.loading.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(
			initClinicGrid({
				pagination: { ...page },
				clinicCode: filter.clinicCode,
				clinicName: filter.clinicName,
				isActive: filter.isActive,
			})
		);
	}, [page.pageNumber, page.pageSize]);

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
			<div className=" bg-white flex flex-col border-2 border-[#00000033] rounded-xl">
				<Row className="justify-between items-center px-4 pt-4 pb-2.5">
					<TextField
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
								})
							)
						}
					/>
					<Button
						variant="outlined"
						onClick={() => dispatch(setIsOpenDrawer(true))}
						startIcon={<img src="/icons/filter.svg" alt="logo" />}
					>
						<p className="text-[13px] whitespace-nowrap">ตัวกรอง</p>
					</Button>
				</Row>
				<BaseGrid
					rows={rows}
					columns={columns}
					page={page}
					loading={isLoading}
					onSortModelChange={(sortModel: GridSortModel) => {
						dispatch(
							setPagination({
								...page,
							})
						);
					}}
				/>
			</div>
			<BaseDrawer
				isOpen={isOpen}
				content={<Drawer />}
				isFilter
				confirmFuntion={() =>
					dispatch(
						initClinicGrid({
							pagination: { ...page },
							clinicCode: filter.clinicCode,
							clinicName: filter.clinicName,
							isActive: filter.isActive,
						})
					)
				}
			/>
		</Column>
	);
}
