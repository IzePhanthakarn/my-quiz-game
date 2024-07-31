"use client";

import React, { useEffect } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { initDiplomaGrid } from "./service";
import { columns } from "./model";
import { setDiplomaFilter, setOrder, setPagination } from "./redux";
import Drawer from "./drawer";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { modelDiplomaFilter } from "./redux/filter/model";
import { LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";

export default function Diploma() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, isOpen, page, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			// form: state.crud.formData,
			rows: state.diploma.grid.list,
			isOpen: state.drawer.isOpen,
			page: state.diploma.grid.page,
			filter: state.diploma.diplomaFilter,
			isLoading: state.loading.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(
			initDiplomaGrid({
				pagination: { ...page },
				diplomaTypeLike: filter.diplomaTypeLike,
				diplomaNameLike: filter.diplomaNameLike,
				isActive: filter.isActive,
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
						content={<Drawer />}
						isFilter
						confirmFuntion={() =>
							dispatch(
								initDiplomaGrid({
									pagination: { ...page },
									diplomaTypeLike: filter.diplomaTypeLike,
									diplomaNameLike: filter.diplomaNameLike,
									isActive: filter.isActive,
								})
							)
						}
						clearFilter={() => dispatch(setDiplomaFilter(modelDiplomaFilter))}
					/>
				}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				AddFunction={() => router.push(LINKS.DIPLOMA.add)}
				AddLabel="เพิ่มประกาศนียบัตร"
				Header="Diploma"
				TotalItems={page.totalData}
			/>
		</div>
	);
}
