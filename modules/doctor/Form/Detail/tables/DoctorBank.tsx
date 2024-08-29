import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumns } from "../model/DoctorBankModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";

export default function DoctorBank() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorBankGrid, dialog } = useSelector(
		(state: SliceModel) => ({
			doctorBankGrid: state.doctor.doctorForm.doctorBank,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	const dialogContentBank = () => {
		return <div>DoctorDetail</div>;
	};

	const dialogContentPostal = () => {
		return <div>DoctorDetail</div>;
	};

	return (
		<div className="space-y-2 flex flex-col">
			<div className="flex self-end space-x-2">
				<BaseButton
					onClick={() =>
						dispatch(
							setDialog({
								...dialog,
								isOpen: true,
								content: dialogContentBank(),
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
								content: dialogContentPostal(),
							})
						)
					}
					label="เพิ่มไปรษณีย์ปลายทาง"
				/>
			</div>
			<BaseGrid
				rows={doctorBankGrid}
				columns={GetColumns({ doctorBankGrid, dispatch })}
			/>
		</div>
	);
}
