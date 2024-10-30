"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import { GetColumns } from "./columns";
import { handleOnGetRequestFormList } from "./service";

import Filters from "./Filters";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";

export default function RequestForm() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { requestForm, isLoading } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			requestForm: state.requestForm,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(handleOnGetRequestFormList(requestForm));
	}, []);

	return (
		<MasterDataLayout
			FilterLayout={
				<FilterLayout FilterForm={<Filters />} handleSubmitSearch={() => {}} />
			}
			AddLabel="เพิ่ม Requst Form"
			TotalItems={requestForm.grid.page.totalData}
			Drawer={<></>}
			AddFunction={() => router.push(LINKS.REQUEST_FORM.add)}
			Grid={
				<BaseGrid
					rows={requestForm.grid.data}
					columns={GetColumns(router)}
					page={requestForm.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnGetRequestFormList({
								...requestForm,
								grid: { ...requestForm.grid, page },
							})
						);
					}}
				/>
			}
		/>
	);
}
