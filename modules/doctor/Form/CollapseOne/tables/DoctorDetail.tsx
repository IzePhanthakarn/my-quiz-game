import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns } from "../model/DoctorDetailModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import DiplomaDialog from "@/modules/doctor/DialogContent/DiplomaDialog";
import { DoctorDetail } from "@/modules/doctor/redux/form/model";

export default function DoctorDetails() {
	const dispatch: AppDispatch = useDispatch();
	const { grid, dialog } = useSelector(
		(state: SliceModel) => ({
			grid: state.doctor.doctorForm.doctorDetail,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	return (
		<div className="space-y-2 flex flex-col">
			<BaseButton
				onClick={() => {
					dispatch(
						setDialog({
							...dialog,
							isOpen: true,
							uniqueContent: <DiplomaDialog />,
						})
					);
				}}
				className="self-end"
				label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
			/>
			<BaseGrid rows={grid} columns={columns} />
		</div>
	);
}
