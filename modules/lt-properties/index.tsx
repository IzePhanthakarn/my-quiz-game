"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/grid";
import { fetchLtPropertiesList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelLtProperties } from "./redux/model";
import { setLtPropertiesFilter, setLtPropertiesGrid } from "./redux";
import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

export default function LtProperties() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { ltProperties, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			ltProperties: state.ltProperties,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<HeaderLayout
					// Header="Lt Property"
					SearchButtonFunction={() => {}}
					FilterTextField={<BaseItemInput className="w-[300px]" />}
					FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				/>
			),
		});
	}, [dispatchLayout]);

	useEffect(() => {
		dispatch(fetchLtPropertiesList(ltProperties));
	}, []);

	return (
		<div>
			<MasterDataLayout
				AddLabel="เพิ่ม Lt Property"
				TotalItems={ltProperties.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={ltProperties.grid.data}
						columns={GetColumns(router)}
						page={ltProperties.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchLtPropertiesList({
									...ltProperties,
									grid: { ...ltProperties.grid, page },
								})
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
							dispatch(
								setLtPropertiesGrid({
									data: ltProperties.grid.data,
									page: {
										...ltProperties.grid.page,
										pageNumber: modelPaginationOptions.pageNumber,
									},
								})
							);
							dispatch(fetchLtPropertiesList(ltProperties));
						}}
						clearFilter={() => {
							dispatch(setLtPropertiesFilter(modelLtProperties.filter));
							dispatch(
								setLtPropertiesGrid({
									data: ltProperties.grid.data,
									page: {
										...ltProperties.grid.page,
										pageNumber: modelPaginationOptions.pageNumber,
									},
								})
							);
							// dispatch(
							// 	fetchLtPropertiesList({
							// 		...ltProperties,
							// 		grid: {
							// 			...ltProperties.grid,
							// 			page: { ...modelPaginationOptions },
							// 		},
							// 	})
							// );
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.LT_PROPERTIES.add)}
			/>
		</div>
	);
}
