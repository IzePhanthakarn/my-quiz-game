import { DiplomaList } from "@/modules/diploma/redux/master/model";
import { DiplomaForm, modelDiplomaForm } from "@/modules/diploma/redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import { DoctorDetailList } from "../redux/form/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setDoctorDetailList, setDoctorForm } from "../redux";
import { setDialog, setIsOpenDialog } from "@/redux/slices/dialog";

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
					const lastIndex = grid.length + 1;
					const newDoctorDetail: DoctorDetailList = {
						id: lastIndex,
						doctorCode: doctor.doctorCode,
						diplomaType: diploma.diplomaType,
						uuid: "",
						isActive: IsActive.Y,
						createdDate: "",
						createdBy: "",
						updatedDate: "",
						updatedBy: "",
					};

					const newGrid = _.cloneDeep(grid);
					newGrid.push(newDoctorDetail);
					dispatch(setDoctorDetailList(newGrid));
					dispatch(setIsOpenDialog(false));
				}}
				label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
			/>
		</div>
	);
}
