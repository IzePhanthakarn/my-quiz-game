"use client";

import React, { useEffect, useState } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { initDiplomaGrid } from "./service";
import { GetColumns } from "./model";
import { setDiplomaFilter, setOrder, setPagination } from "./redux";
import { LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { diplomaName } from "./interface/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { DiplomaFilter, modelDiplomaFilter } from "./redux/filter/model";

export default function Diploma() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, page, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			rows: state.diploma.grid.list,
			page: state.diploma.grid.page,
			filter: state.diploma.diplomaFilter,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	const [tmpFilter, setTmpFilter] = useState<DiplomaFilter>(modelDiplomaFilter);

	const fetchList = (page: PaginationOptions, setFilter = true) => {
		let newFilter = { ...filter };
		if (setFilter) {
			newFilter = {
				...filter,
				...tmpFilter,
			};
			dispatch(setDiplomaFilter(newFilter));
		}
		dispatch(setPagination(page));
		dispatch(
			initDiplomaGrid({
				pagination: { ...page },
				diplomaTypeLike: newFilter.diplomaTypeLike,
				diplomaNameLike: newFilter.diplomaNameLike,
				isActive: newFilter.isActive,
			})
		);
	};

	useEffect(() => {
		setTmpFilter(modelDiplomaFilter);
		dispatch(setDiplomaFilter(modelDiplomaFilter));
		fetchList(page);
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="grid grid-cols-4 gap-x-2 w-full">
								<BaseItemInput
									notForm
									label={diplomaName.diplomaType}
									itemName="diplomaTypeLike"
									value={tmpFilter.diplomaTypeLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											diplomaTypeLike: e.target.value,
										});
									}}
									onPressEnter={() => fetchList({ ...page, pageNumber: 0 })}
								/>
								<BaseItemInput
									notForm
									label={diplomaName.diplomaName}
									itemName="diplomaNameLike"
									value={tmpFilter.diplomaNameLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											diplomaNameLike: e.target.value,
										});
									}}
									onPressEnter={() => fetchList({ ...page, pageNumber: 0 })}
								/>
								<MedDropDown
									notForm
									label="สถานะการใช้งาน"
									option={DROPDOWN_ISACTIVE}
									value={tmpFilter.isActive}
									itemName="isActive"
									getValue={(value) => {
										setTmpFilter({
											...tmpFilter,
											isActive: value,
										});
									}}
								/>
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							fetchList({ ...page, pageNumber: 0 });
						}}
					/>
				}
				Grid={
					<BaseGrid
						rows={rows}
						loading={isLoading}
						columns={GetColumns(router)}
						page={page}
						twoToneColor={true}
						setOrder={(e) => dispatch(setOrder(e))}
						setPagination={(page) => fetchList(page, false)}
					/>
				}
				// Drawer={
				// 	<BaseDrawer
				// 		isOpen={isOpen}
				// 		setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
				// 		content={<FilterDrawer />}
				// 		isFilter
				// 		confirmFuntion={() =>
				// 			dispatch(
				// 				initDiplomaGrid({
				// 					pagination: { ...page },
				// 					diplomaTypeLike: tmpFilter.diplomaTypeLike,
				// 					diplomaNameLike: tmpFilter.diplomaNameLike,
				// 					isActive: tmpFilter.isActive,
				// 				})
				// 			)
				// 		}
				// 		clearFilter={() => dispatch(setDiplomaFilter(modelDiplomaFilter))}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.DIPLOMA.add)}
				AddLabel="เพิ่มวุฒิบัตร"
				TotalItems={page.totalData}
			/>
		</div>
	);
}
