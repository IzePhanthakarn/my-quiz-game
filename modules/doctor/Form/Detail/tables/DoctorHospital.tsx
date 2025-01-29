import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumns } from "../model/DoctorHospitalModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import HospitalDialog from "@/modules/doctor/DialogContent/HospitalDialog";
import { modelDialog } from "@/redux/slices/dialog/model";

export default function DoctorHospital() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorHospitalGrid, doctor } = useSelector(
		(state: SliceModel) => ({
			doctorHospitalGrid: state.doctor.doctorForm.doctorHospital,
			doctor: state.doctor.doctorForm.doctorData,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	return (
		<div className="space-y-2 flex flex-col">
			<BaseButton
				onClick={() =>
					dispatch(
						setDialog({
							...modelDialog,
							isOpen: true,
							uniqueContent: (
								<HospitalDialog
									doctorHospitalGrid={doctorHospitalGrid}
									editId={undefined}
								/>
							),
						})
					)
				}
				className="self-end"
				label="เพิ่มสังกัดโรงพยาบาล"
			/>
			<BaseGrid
				rows={doctorHospitalGrid}
				columns={GetColumns({
					doctorCode: doctor.doctorCode,
					doctorHospitalGrid,
					dispatch,
				})}
			/>
		</div>
	);
}
