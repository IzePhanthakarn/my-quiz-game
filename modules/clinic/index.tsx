"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clinicPagination, initClinicGrid } from "./service";
import { setFieldValue } from "@/redux/slices/crud";
import { columns } from "./model";
import Column from "@/components/Column";
import Row from "@/components/Row";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import Drawer from "./drawer";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { LINKS } from "@/constants/links";
import BaseDrawer from "@/components/BaseDrawer";
import _ from "lodash";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { setOrder, setPagination } from "./redux";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "antd/es/button";

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
	}, [page.pageNumber, page.pageSize, page.orders]);

	return (
		<Column>
			<Grid container rowSpacing={3} spacing={5} className="pb-5">
				<Grid item sm={12} md={6}>
					<p className="font-bold text-4xl leading-[48px]">คลินิค</p>
					<p className="text-2xl leading-[18.75px]">คลินิค</p>
				</Grid>
				<Grid item sm={12} md={6} className="content-end text-right">
					<div>
						<Link key={LINKS.CLINIC.add} href={LINKS.CLINIC.add}>
							<Button
								className="text-xl px-3 py-2"
								icon={<PlusOutlined />}
								type="primary"
								size="large"
							>
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
						size="large"
						className="text-xl px-3 py-2"
						// variant="outlined"
						onClick={() => dispatch(setIsOpenDrawer(true))}
						// startIcon={<img src="/icons/filter.svg" alt="logo" />}
						icon={<FilterOutlined />}
					>
						<p className=" whitespace-nowrap">ตัวกรอง</p>
					</Button>
				</Row>
				<BaseGrid
					rows={rows}
					columns={columns}
					page={page}
					loading={isLoading}
					twoToneColor={true}
					setOrder={(e) => dispatch(setOrder(e))}
					setPagination={(page) => dispatch(setPagination(page))}
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
