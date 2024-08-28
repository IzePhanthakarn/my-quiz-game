import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { getColumns } from "../model/DoctorDetailModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import DiplomaDialog from "@/modules/doctor/DialogContent/DiplomaDialog";
import _ from "lodash";

export default function DoctorDetails() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorDetailGrid, doctor, dialog } = useSelector(
		(state: SliceModel) => ({
			doctorDetailGrid: state.doctor.doctorForm.doctorDetail,
			doctor: state.doctor.doctorForm.doctorData,
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
							uniqueContent: (
								<DiplomaDialog
									doctorDetailGrid={doctorDetailGrid}
									doctor={doctor}
								/>
							),
						})
					);
				}}
				className="self-end"
				label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
			/>
			<BaseGrid
				rows={doctorDetailGrid}
				columns={dispatch(getColumns({ doctorDetailGrid, doctor }))}
			/>
		</div>
	);
}
