"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { GetColumns } from "./columns/grid";
import { fetchLtPropertiesList } from "./service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import FilterDrawer from "./FilterDrawer";
import {
	LtPropertiesFilter,
	modelLtProperties,
	modelLtPropertiesFilter,
} from "./redux/model";
import { setLtPropertiesFilter, setLtPropertiesGrid } from "./redux";
import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { ltPropertiesName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";

export default function LtProperties() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { ltProperties, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			ltProperties: state.ltProperties,
			filter: state.ltProperties.filter,
		}),
		shallowEqual
	);

	const [tmpFilter, setTmpFilter] = useState<LtPropertiesFilter>(
		modelLtPropertiesFilter
	);

	const search = () => {
		const newFilter = { ...filter, ...tmpFilter };
		console.log("newFilter", newFilter);
		dispatch(setLtPropertiesFilter(newFilter));
		dispatch(
			fetchLtPropertiesList({
				...ltProperties,
				filter: newFilter,
				grid: {
					...ltProperties.grid,
					page: { ...ltProperties.grid.page, pageNumber: 0 },
				},
			})
		);
	};

	useEffect(() => {
		setTmpFilter(modelLtPropertiesFilter);
		dispatch(setLtPropertiesFilter(modelLtPropertiesFilter));
		dispatch(
			fetchLtPropertiesList({
				...ltProperties,
				filter: modelLtPropertiesFilter,
				grid: {
					...ltProperties.grid,
					page: { ...ltProperties.grid.page, pageNumber: 0 },
				},
			})
		);
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="grid grid-cols-5 gap-x-2 w-full">
								<BaseItemInput
									notForm
									label={ltPropertiesName.propertyCode}
									itemName="propertyCodeLike"
									value={tmpFilter.propertyCodeLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											propertyCodeLike: e.target.value,
										});
									}}
									onPressEnter={() => search()}
								/>
								<BaseItemInput
									notForm
									label={ltPropertiesName.groupName}
									itemName="groupNameLike"
									value={tmpFilter.groupNameLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											groupNameLike: e.target.value,
										});
									}}
									onPressEnter={() => search()}
								/>
								<BaseItemInput
									notForm
									label={ltPropertiesName.propertyText}
									itemName="propertyTextLike"
									value={tmpFilter.propertyTextLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											propertyTextLike: e.target.value,
										});
									}}
									onPressEnter={() => search()}
								/>
								<BaseItemInput
									notForm
									label={ltPropertiesName.description}
									itemName="descriptionLike"
									value={tmpFilter.descriptionLike}
									onChangeFunction={(e) => {
										setTmpFilter({
											...tmpFilter,
											descriptionLike: e.target.value,
										});
									}}
									onPressEnter={() => search()}
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
							search();
						}}
					/>
				}
				AddLabel="เพิ่ม Lt-Properties"
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
				// Drawer={
				// 	<BaseDrawer
				// 		isFilter
				// 		isOpen={isOpen}
				// 		content={<FilterDrawer />}
				// 		setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
				// 		confirmFuntion={() => {
				// 			dispatch(
				// 				setLtPropertiesGrid({
				// 					data: ltProperties.grid.data,
				// 					page: {
				// 						...ltProperties.grid.page,
				// 						pageNumber: modelPaginationOptions.pageNumber,
				// 					},
				// 				})
				// 			);
				// 			search();
				// 		}}
				// 		clearFilter={() => {
				// 			dispatch(setLtPropertiesFilter(modelLtProperties.filter));
				// 			dispatch(
				// 				setLtPropertiesGrid({
				// 					data: ltProperties.grid.data,
				// 					page: {
				// 						...ltProperties.grid.page,
				// 						pageNumber: modelPaginationOptions.pageNumber,
				// 					},
				// 				})
				// 			);
				// 			// dispatch(
				// 			// 	fetchLtPropertiesList({
				// 			// 		...ltProperties,
				// 			// 		grid: {
				// 			// 			...ltProperties.grid,
				// 			// 			page: { ...modelPaginationOptions },
				// 			// 		},
				// 			// 	})
				// 			// );
				// 		}}
				// 	/>
				// }
				AddFunction={() => router.push(LINKS.LT_PROPERTIES.add)}
			/>
		</div>
	);
}
