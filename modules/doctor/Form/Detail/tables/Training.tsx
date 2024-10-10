import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumns } from "../model/TraningModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import TraningDialog from "@/modules/doctor/DialogContent/TrainingDialog";
import { modelDialog } from "@/redux/slices/dialog/model";

export default function Training() {
	const dispatch: AppDispatch = useDispatch();
	const { trainingGrid } = useSelector(
		(state: SliceModel) => ({
			trainingGrid: state.doctor.doctorForm.doctorTraining,
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
							uniqueContent: <TraningDialog trainingGrid={trainingGrid} />,
						})
					)
				}
				className="self-end"
				label="เพิ่มข้อมูลการอบรม"
			/>
			<BaseGrid
				rows={trainingGrid}
				columns={GetColumns({
					trainingGrid,
					dispatch,
				})}
			/>
		</div>
	);
}
