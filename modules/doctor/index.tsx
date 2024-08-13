"use client";

import React, { useEffect } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setDoctorFilter, setOrder, setPagination } from "./redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";
import { initDoctorGrid } from "./service";
import { modelDoctorFilter } from "./redux/filter/model";
import { columns } from "./model";
import FilterDrawer from "./FilterDrawer";

export default function Doctor() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, isOpen, page, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			rows: state.doctor.grid.list,
			isOpen: state.drawer.isOpen,
			page: state.doctor.grid.page,
			filter: state.doctor.doctorFilter,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(
			initDoctorGrid({
				pagination: { ...page },
				...filter,
			})
		);
	}, [page.pageNumber, page.pageSize, page.orders]);
	return (
		<div>
			<MasterDataLayout
				Grid={
					<BaseGrid
						rows={rows}
						loading={isLoading}
						columns={columns}
						page={page}
						twoToneColor={true}
						setOrder={(e) => dispatch(setOrder(e))}
						setPagination={(page) => dispatch(setPagination(page))}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isOpen}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						content={<FilterDrawer />}
						isFilter
						confirmFuntion={() =>
							dispatch(
								initDoctorGrid({
									pagination: { ...page },
									...filter,
								})
							)
						}
						clearFilter={() => dispatch(setDoctorFilter(modelDoctorFilter))}
					/>
				}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				AddFunction={() => router.push(LINKS.DOCTOR.add)}
				AddLabel="สร้างแพทย์"
				Header="Doctor"
				TotalItems={page.totalData}
				SearchButtonFunction={() => {}}
			/>
		</div>
	);
}
