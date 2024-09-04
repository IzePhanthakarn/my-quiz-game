import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumnBank, GetColumnPostal } from "../model/DoctorBankModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import PostalCodeDialog from "@/modules/doctor/DialogContent/PostCodeDialog";
import BankDialog from "@/modules/doctor/DialogContent/BankDialog";

export default function DoctorBank() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorBankGrid, doctorPostalGrid, doctor, dialog } = useSelector(
		(state: SliceModel) => ({
			doctorBankGrid: state.doctor.doctorForm.doctorBank,
			doctorPostalGrid: state.doctor.doctorForm.doctorPostal,
			doctor: state.doctor.doctorForm.doctorData,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	return (
		<div className="space-y-2 flex flex-col">
			<div className="flex self-end space-x-2">
				<BaseButton
					onClick={() =>
						dispatch(
							setDialog({
								...dialog,
								isOpen: true,
								uniqueContent: (
									<BankDialog
										doctorBankList={doctorBankGrid}
										doctorCode={doctor.doctorCode}
									/>
								),
							})
						)
					}
					label="เพิ่มข้อมูลธนาคาร"
				/>
				<BaseButton
					onClick={() =>
						dispatch(
							setDialog({
								...dialog,
								isOpen: true,
								uniqueContent: <PostalCodeDialog />,
							})
						)
					}
					label="เพิ่มไปรษณีย์ปลายทาง"
				/>
			</div>
			<BaseGrid
				rows={doctorBankGrid}
				columns={GetColumnBank({ doctorBankGrid, dispatch })}
			/>
			<BaseGrid
				rows={doctorPostalGrid}
				columns={GetColumnPostal({ doctorPostalGrid, dispatch })}
			/>
		</div>
	);
}
