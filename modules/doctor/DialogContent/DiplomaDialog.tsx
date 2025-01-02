"use client";

import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleDoctorDetailRows } from "./service";
import { DoctorDetailList, DoctorData } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { SliceModel } from "@/redux/slices/model";
interface Props {
	doctorDetailGrid: DoctorDetailList[];
	editId?: number;
}

export default function DiplomaDialog(props: Props) {
	const { doctorDetailGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [diplomaType, setDiplomaType] = React.useState<string | null>(null);
	const [uuid, setUuid] = React.useState<string | null>(null);

	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		setDiplomaType(null);
		if (editId) {
			const data = _.find(doctorDetailGrid, ["id", editId]);
			const handle = _.get(data, "diplomaType");
			if (typeof handle === "object")
				setDiplomaType(_.get(handle, "diplomaType") ?? null);
			else setDiplomaType(handle ?? null);
			// console.log("data", data);
			// setDiplomaType(_.get(data, "diplomaType.diplomaType") ?? null);
			setUuid(data?.uuid ?? null);
		}
	}, [doctorDetailGrid, isOpen, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					type={SESSION_NAME.DIPLOMA}
					className="h-full w-full"
					label="วุฒิบัตรเฉพาะทาง"
					getValue={(e) => setDiplomaType(e)}
					value={_.isEmpty(diplomaType) ? null : diplomaType}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isEmpty(diplomaType)}
				onClick={() => {
					dispatch(
						handleDoctorDetailRows({
							diplomaType: diplomaType,
							doctorDetailGrid,
							editId,
							uuid,
						})
					);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
