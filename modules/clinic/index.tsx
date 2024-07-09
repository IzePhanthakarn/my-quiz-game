"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
import { columns } from "./model";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import Drawer from "./drawer";

import { LINKS } from "@/constants/links";
import _ from "lodash";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { setOrder, setPagination } from "./redux";
import { FilterOutlined } from "wcf-component-lib/node_modules/@ant-design/icons";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import BaseButton from "wcf-component-lib/src/components/BaseButton";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
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
		<div>
			<BaseButton
				type="primary"
				label="เพิ่มคลินิค"
				onClick={() => console.log("asdas")}
			/>
			<MasterData
				Grid={
					<BaseGrid
						rows={rows}
						columns={columns}
						page={page}
						loading={isLoading}
						twoToneColor={true}
						setOrder={(e) => dispatch(setOrder(e))}
						setPagination={(page) => dispatch(setPagination(page))}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isOpen}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
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
				}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButton={
					<Button
						size="large"
						className="text-xl px-3 py-2"
						onClick={() => dispatch(setIsOpenDrawer(true))}
						icon={<FilterOutlined />}
					>
						<p className=" whitespace-nowrap">ตัวกรอง</p>
					</Button>
				}
				AddFunction={() => router.push(LINKS.CLINIC.add)}
				AddLabel="เพิ่มคลินิค"
				Header="Clinic"
				SubHeader="List Clinic"
			/>
		</div>
	);
}
