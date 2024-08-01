"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TestApi from "wcf-component-lib/src/components/TestApi";
import { getClinicList } from "../clinic/service";

export default function Api() {
	const dispatch: AppDispatch = useDispatch();
	const { page, filter } = useSelector(
		(state: SliceModel) => ({
			page: state.clinic.grid.page,
			filter: state.clinic.clinicFilter,
		}),
		shallowEqual
	);

	return (
		<TestApi
			label={"asd"}
			onClick={() => console.log("asd")}
			apiTest={() =>
				dispatch(
					getClinicList({
						pagination: { ...page },
						clinicCodeLike: filter.clinicCodeLike,
						clinicNameLike: filter.clinicNameLike,
						isActive: filter.isActive,
					})
				)
			}
		/>
	);
}
