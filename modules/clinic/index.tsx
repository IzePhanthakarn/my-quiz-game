"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
import { columns } from "./model";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { setClinicFilter, setOrder, setPagination } from "./redux";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import Drawer from "./drawer";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { modelClinicFilter } from "./redux/filter/model";

export default function Clinic() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, page, isOpen, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			// form: state.crud.formData,
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
				clinicCodeLike: filter.clinicCodeLike,
				clinicNameLike: filter.clinicNameLike,
				isActive: filter.isActive,
			})
		);
	}, [page.pageNumber, page.pageSize, page.orders]);

	return (
		<MasterDataLayout
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
								clinicCodeLike: filter.clinicCodeLike,
								clinicNameLike: filter.clinicNameLike,
								isActive: filter.isActive,
							})
						)
					}
					clearFilter={() => dispatch(setClinicFilter(modelClinicFilter))}
				/>
			}
			FilterTextField={<Input className="w-[300px]" />}
			FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
			AddFunction={() => router.push(LINKS.CLINIC.add)}
			AddLabel="เพิ่มคลินิค"
			Header="Clinic"
			TotalItems={page.totalData}
		/>
	);
}
