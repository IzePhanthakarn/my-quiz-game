"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { FilterOutlined } from "wcf-component-lib/node_modules/@ant-design/icons";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { grid } from "./columns/grid";
import { fetchDocumentList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import { modelDocument } from "./redux/model";
import { setDocumentFilter } from "./redux";

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
				AddLabel="เพิ่ม Document"
				Header="Document"
				TotalItems={document.grid.page.totalData}
				SearchButtonFunction={() => {}}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButtonFunction={() => dispatch(setIsOpenDrawer(true))}
				Grid={
					<BaseGrid
						rows={document.grid.data}
						columns={grid}
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
