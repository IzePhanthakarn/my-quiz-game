"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/manipulate";
import { fetchOrganList } from "./service";
import FilterDrawer from "./FilterDrawer";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function OrganSystemWpi() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { organ, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			organ: state.organSystemWpi,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchOrganList(organ));
	}, []);

	return (
		<div className="w-full h-full">
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseItemInput notForm label="ค้นหา" onPressEnter={() => {}} />
						}
						handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {}}
					/>
				}
				AddLabel="เพิ่มออร์แกน"
				TotalItems={organ.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={organ.grid.data}
						columns={GetColumns(router)}
						page={organ.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchOrganList({ ...organ, grid: { ...organ.grid, page } })
							);
						}}
					/>
				}
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<FilterDrawer />}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {
							dispatch(fetchOrganList(organ));
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.ORGAN_SYSTEM_WPI.add)}
			/>
		</div>
	);
}
