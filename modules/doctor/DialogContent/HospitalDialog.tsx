import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorData, DoctorHospitalList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import {
	DoctorHospital,
	modelDoctorHospital,
} from "wcf-component-lib/src/components/BaseDropDown/model";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
interface Props {
	doctorHospitalGrid: DoctorHospitalList[];
	doctor: DoctorData;
	editId?: number;
}

export default function HospitalDialog(props: Props) {
	const { doctorHospitalGrid, doctor, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [hospital, setHospital] =
		React.useState<DoctorHospital>(modelDoctorHospital);

	useEffect(() => {
		const data = _.find(doctorHospitalGrid, ["id", editId]);
	}, [doctorHospitalGrid, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลโรงพยาบาลของแพทย์</p>
			<div className="w-full space-y-2">
				<BaseDropDown
					notForm
					className="h-full w-full"
					label="รหัสโรงพยาบาล"
					type="hospital"
					value={
						_.isEmpty(hospital.hospitalWcfCode)
							? null
							: `${hospital.hospitalWcfCode}-${hospital.hospitalName}`
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
				<BaseDropDown
					notForm
					className="h-full w-full"
					label="รหัสโรงพยาบาล"
					type="hospital"
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
					console.log("hospital", hospital);
					setHospital(modelDoctorHospital);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
