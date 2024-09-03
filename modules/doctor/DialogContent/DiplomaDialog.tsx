"use client";

import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleDoctorDetailRows } from "./service";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorDetailList, DoctorData } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import { setOnCancelDialog } from "@/redux/slices/dialog";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_TYPE } from "@/components/MedDropDown/model";
interface Props {
	doctorDetailGrid: DoctorDetailList[];
	doctor: DoctorData;
	editId?: number;
}

export default function DiplomaDialog(props: Props) {
	const { doctorDetailGrid, doctor, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [diplomaType, setDiplomaType] = React.useState("");

	useEffect(() => {
		const handleCancel = () => setDiplomaType("");
		dispatch(setOnCancelDialog(handleCancel));
	}, []);

	useEffect(() => {
		if (editId) {
			const data = _.find(doctorDetailGrid, ["id", editId]);
			setDiplomaType(data?.diplomaType ?? "");
		} else {
			setDiplomaType("");
		}
	}, [doctorDetailGrid, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					type={DROPDOWN_TYPE.DIPLOMA}
					className="h-full w-full"
					label="วุฒิบัตรเฉพาะทาง"
					getValue={(e) => setDiplomaType(e)}
					value={_.isEmpty(diplomaType) ? null : diplomaType}
				/>
				{/* <BaseDropDown
					type="diploma"
					getValue={(e) => {
						setDiplomaType(e);
					}}
				/> */}
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
							doctorCode: doctor.doctorCode,
							doctorDetailGrid,
							editId,
						})
					);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
