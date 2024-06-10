"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid, initGetClinicDetail } from "./service";
import { setFieldValue } from "@/redux/slices/crud";
import { columns } from "./model";
import BaseGrid from "@/components/BaseGrid";
import Button from "@mui/material/Button";
import BaseDrawer from "@/components/BaseDrawer";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import FilterForm from "@/components/BaseDrawer/contents/filter-form/index";
import { setIsOpenDialog } from "@/components/BaseDialog/redux";
import BaseDialog from "@/components/BaseDialog";
import RequiredDoc from "@/components/BaseDialog/contents/required-doc";

export default function ClinicForm(params: ClinicFormPageProps) {
	const dispatch: AppDispatch = useDispatch();
	const { clinicDetail } = useSelector(
		(state: SliceModel) => ({
			clinicDetail: state.clinic.clinicDetail,
		}),
		shallowEqual
	);

	useEffect(() => {
		return () => {
			dispatch(initGetClinicDetail(params));
		};
	}, []);
	console.log("🚀 ~ ClinicForm ~ clinicDetail:", clinicDetail);
	return <div className="w-full flex flex-col relative">233</div>;
}
