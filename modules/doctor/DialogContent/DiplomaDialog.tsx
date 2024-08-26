import { DiplomaForm, modelDiplomaForm } from "@/modules/diploma/redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import { addDoctorDetailRows } from "./service";

export default function DiplomaDialog() {
	const dispatch: AppDispatch = useDispatch();
	const { grid, doctor } = useSelector(
		(state: SliceModel) => ({
			grid: state.doctor.doctorForm.doctorDetail,
			doctor: state.doctor.doctorForm.doctorData,
		}),
		shallowEqual
	);

	const [diploma, setDiploma] = React.useState<DiplomaForm>(modelDiplomaForm);

	return (
		<div className="flex flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<div className="w-full">
				<BaseDropDown
					label="วุฒิบัตรเฉพาะทาง"
					itemName="diploma"
					type="diploma"
					getValue={(e) => {
						setDiploma(e[0]);
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				onClick={() => {
					dispatch(
						addDoctorDetailRows({
							diplomaType: diploma.diplomaType,
							doctorCode: doctor.doctorCode,
							doctorDetail: grid,
						})
					);
				}}
				label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
			/>
		</div>
	);
}
