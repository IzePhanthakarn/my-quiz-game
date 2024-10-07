import { SliceModel } from "@/redux/slices/model";
import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function Editing() {
	const { detail } = useSelector(
		(state: SliceModel) => ({ detail: state.requestForm.detail }),
		shallowEqual
	);

	const renderItemText = (label: string, value: string | number) => (
		<div className="flex flex-col text-label space-y-4">
			<p>{label}</p>
			<p>{value}</p>
		</div>
	);

	return (
		<div className="grid grid-cols-5 gap-y-2 gap-x-8">
			{renderItemText("วันที่ทำการตรวจสอบ", detail.assessDate)}
			{renderItemText("วันที่ออกใบคำขอ", detail.approveDate)}
			{renderItemText("สถานที่ทำการตรวจ", detail.inAnotherPlace)}
			{renderItemText("ค่าตรวจประเมิน", detail.fareAmount)}
			{renderItemText("ผู้บันทึก", detail.userName)}
		</div>
	);
}
