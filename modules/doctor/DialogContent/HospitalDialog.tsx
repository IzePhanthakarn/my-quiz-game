import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorHospitalList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import {
	DoctorHospital,
	modelDoctorHospital,
} from "wcf-component-lib/src/components/BaseDropDown/model";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { handleHospital, handleHospitalRows } from "./service";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { SliceModel } from "@/redux/slices/model";
interface Props {
	doctorHospitalGrid: DoctorHospitalList[];
	editId?: number;
}

export default function HospitalDialog(props: Props) {
	const { doctorHospitalGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	const [hospital, setHospital] =
		React.useState<DoctorHospital>(modelDoctorHospital);

	useEffect(() => {
		setHospital(modelDoctorHospital);
		if (editId) {
			const data = _.find(doctorHospitalGrid, ["id", editId]);
			if (!_.isEmpty(data)) {
				setHospital({
					hospitalWcfCode: _.get(data, "hospital.hospitalWcfCode") ?? "",
					hospitalName: data.hospitalWcfName ?? "",
					jobType: data.jobType ?? "",
					position: data.position ?? "",
				});
			}
		}
	}, [doctorHospitalGrid, isOpen, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลโรงพยาบาลของแพทย์</p>
			<div className="w-full space-y-2">
				<MedDropDown
					notForm
					className="h-full w-full"
					label="รหัสโรงพยาบาล"
					type={SESSION_NAME.HOSPITAL}
					value={
						_.isEmpty(hospital.hospitalWcfCode)
							? null
							: handleHospital(hospital, setHospital)
					}
					getValue={(e) => {
						const data = e.split("-");
						setHospital({
							...hospital,
							hospitalWcfCode: data[0],
							hospitalName: data[1],
						});
					}}
				/>
				<MedDropDown
					notForm
					className="h-full w-full"
					label="ลักษณะงานที่รับผิดชอบ"
					type={SESSION_NAME.JOB_TYPE}
					value={_.isEmpty(hospital.jobType) ? null : hospital.jobType}
					getValue={(e) => {
						setHospital({
							...hospital,
							jobType: e,
						});
					}}
				/>
				<BaseItemInput
					notForm
					label="ตำแหน่ง"
					labelPosition={BaseFormItemPosition.TOP}
					value={hospital.position}
					onChangeFunction={(e) =>
						setHospital({ ...hospital, position: e.target.value })
					}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.some(_.values(hospital), (value) => value === "")}
				onClick={() => {
					dispatch(
						handleHospitalRows({
							hospital,
							doctorHospitalGrid,
							editId,
						})
					);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
