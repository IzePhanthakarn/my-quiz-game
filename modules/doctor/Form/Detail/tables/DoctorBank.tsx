import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumnBank } from "../model/DoctorBankModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import BankDialog from "@/modules/doctor/DialogContent/BankDialog";
import { modelDialog } from "@/redux/slices/dialog/model";

export default function DoctorBank() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorBankGrid } = useSelector(
		(state: SliceModel) => ({
			doctorBankGrid: state.doctor.doctorForm.doctorBank,
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
								...modelDialog,
								isOpen: true,
								uniqueContent: <BankDialog doctorBankGrid={doctorBankGrid} />,
							})
						)
					}
					label="เพิ่มข้อมูลธนาคาร"
				/>
				{/* <BaseButton
					onClick={() =>
						dispatch(
							setDialog({
								...modelDialog,
								isOpen: true,
								uniqueContent: (
									<PostalCodeDialog doctorPostalGrid={doctorPostalGrid} />
								),
							})
						)
					}
					label="เพิ่มไปรษณีย์ปลายทาง"
				/> */}
			</div>
			<BaseGrid
				rows={doctorBankGrid}
				columns={GetColumnBank({
					doctorBankGrid,
					dispatch,
				})}
			/>
			{/* <BaseGrid
				rows={doctorPostalGrid}
				columns={GetColumnPostal({
					doctorPostalGrid,
					dispatch,
				})}
			/> */}
		</div>
	);
}
