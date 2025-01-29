"use client";

import React, { useEffect } from "react";
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
import { modelDiplomaFilter } from "./redux/filter/model";
import axios from "axios";

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

	const fetchList = (page: PaginationOptions, isFilter: boolean = false) => {
		dispatch(setPagination(page));
		dispatch(
			initDiplomaGrid({
				pagination: { ...page },
				diplomaTypeLike: isFilter
					? modelDiplomaFilter.diplomaTypeLike
					: filter.diplomaTypeLike,
				diplomaNameLike: isFilter
					? modelDiplomaFilter.diplomaNameLike
					: filter.diplomaNameLike,
				isActive: filter.isActive,
			})
		);
	};

	useEffect(() => {
		const url =
			"https://wcfapidev.sso.go.th/med/master/diploma/70028997-bd05-4b0c-9b47-d8538aa51d14";
		const headers = {
			// Origin: "https://wcfdev.sso.go.th", // ต้องเป็นโดเมนของ Frontend จริง
			"Access-Control-Request-Method": "PATCH",
			"Access-Control-Request-Headers": "Authorization, Content-Type",
		};

		axios
			.options(url, { headers })
			.then((response) => {
				console.log("✅ Pre-flight Response:", response);
			})
			.catch((error) => {
				console.error("❌ Pre-flight Error:", error);
			});
	}, []);

	useEffect(() => {
		dispatch(setDiplomaFilter(modelDiplomaFilter));
		fetchList(page, true);
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						FilterForm={
							<div className="flex items-center space-x-2">
								<BaseItemInput
									notForm
									label={diplomaName.diplomaType}
									itemName="diplomaTypeLike"
									value={filter.diplomaTypeLike}
									onChangeFunction={(e) => {
										dispatch(
											setDiplomaFilter({
												...filter,
												diplomaTypeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => fetchList({ ...page, pageNumber: 0 })}
								/>
								<BaseItemInput
									notForm
									label={diplomaName.diplomaName}
									itemName="diplomaNameLike"
									value={filter.diplomaNameLike}
									onChangeFunction={(e) => {
										dispatch(
											setDiplomaFilter({
												...filter,
												diplomaNameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => fetchList({ ...page, pageNumber: 0 })}
								/>
								<div className="w-[240px]">
									<MedDropDown
										notForm
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										value={filter.isActive}
										itemName="isActive"
										getValue={(value) => {
											dispatch(
												setDiplomaFilter({
													...filter,
													isActive: value,
												})
											);
										}}
									/>
								</div>
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
						setPagination={(page) => fetchList(page, true)}
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
				// 					diplomaTypeLike: filter.diplomaTypeLike,
				// 					diplomaNameLike: filter.diplomaNameLike,
				// 					isActive: filter.isActive,
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
