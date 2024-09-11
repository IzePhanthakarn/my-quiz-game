"use client";

import React, { useEffect } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { initDiplomaGrid } from "./service";
import { GetColumns } from "./model";
import { setDiplomaFilter, setOrder, setPagination } from "./redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { modelDiplomaFilter } from "./redux/filter/model";
import { LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";
import FilterDrawer from "./FilterDrawer";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

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
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<HeaderLayout
					FilterTextField={<BaseItemInput className="w-[300px]" />}
					FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
					// Header="Diploma"
					SearchButtonFunction={() => {}}
				/>
			),
		});
	}, [dispatchLayout]);

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
						columns={GetColumns(router)}
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
				AddFunction={() => router.push(LINKS.DIPLOMA.add)}
				AddLabel="เพิ่มประกาศนียบัตร"
				TotalItems={page.totalData}
			/>
		</div>
	);
}
