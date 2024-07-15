"use client";

import React, { useEffect } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { initDiplomaGrid } from "./service";
import { columns } from "./model";
import { setDiplomaFilter, setOrder, setPagination } from "./redux";
import Drawer from "./drawer";
import FilterOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/FilterOutlined";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { modelDiplomaFilter } from "./redux/filter/model";

export default function Diploma() {
	const dispatch: AppDispatch = useDispatch();
	const { form, rows, isOpen, page, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			form: state.crud.formData,
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
				diplomaType: filter.diplomaType,
				diplomaName: filter.diplomaName,
				isActive: filter.isActive,
			})
		);
	}, [page.pageNumber, page.pageSize, page.orders]);
	return (
		<div>
			<MasterData
				Grid={
					<BaseGrid
						rows={rows}
						loading={false}
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
									diplomaType: filter.diplomaType,
									diplomaName: filter.diplomaName,
									isActive: filter.isActive,
								})
							)
						}
						clearFilter={() => dispatch(setDiplomaFilter(modelDiplomaFilter))}
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
				AddFunction={() => console.log("Add")}
				AddLabel="เพิ่มประกาศนียบัตร"
				Header="Diploma"
				SubHeader="List Diploma"
			/>
		</div>
	);
}
