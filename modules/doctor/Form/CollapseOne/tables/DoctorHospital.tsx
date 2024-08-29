import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns } from "../model/DoctorHospitalModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";

export default function DoctorHospital() {
	const dispatch: AppDispatch = useDispatch();
	const { grid, dialog } = useSelector(
		(state: SliceModel) => ({
			grid: state.doctor.doctorForm.doctorHospital,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	const dialogContent = () => {
		return <div>DoctorDetail</div>;
	};

	return (
		<div className="space-y-2 flex flex-col">
			<BaseButton
				onClick={() =>
					dispatch(
						setDialog({
							...dialog,
							isOpen: true,
							content: dialogContent(),
						})
					)
				}
				className="self-end"
				label="เพิ่มสังกัดโรงพยาบาล"
			/>
			<BaseGrid rows={grid} columns={columns} />
		</div>
	);
}
