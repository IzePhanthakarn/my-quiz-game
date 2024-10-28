"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/grid";
import { fetchDocumentList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelDocument } from "./redux/model";
import { setDocumentFilter } from "./redux";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function Document() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { document, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.container.isLoading,
			document: state.document,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchDocumentList(document));
	}, []);

	return (
		<div>
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
				AddLabel="เพิ่ม Document"
				TotalItems={document.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={document.grid.data}
						columns={GetColumns(router)}
						page={document.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchDocumentList({
									...document,
									grid: { ...document.grid, page },
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
							dispatch(fetchDocumentList(document));
						}}
						clearFilter={() => {
							dispatch(setDocumentFilter(modelDocument.filter));
						}}
					/>
				}
				AddFunction={() => router.push(LINKS.DOCUMENT.add)}
			/>
		</div>
	);
}
