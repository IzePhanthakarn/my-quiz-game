import { DiplomaForm, modelDiplomaForm } from "@/modules/diploma/redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorDetailList, DoctorData } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_TYPE } from "wcf-component-lib/src/constants/dropdown";
interface Props {
	doctorDetailGrid: DoctorDetailList[];
	doctor: DoctorData;
	editId?: number;
}

export default function PostalCodeDialog() {
	// const { doctorDetailGrid, doctor, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [postalCode, setPostalCode] = React.useState("");
	const [postalName, setPostalName] = React.useState("");

	useEffect(() => {
		setPostalCode("");
		setPostalName("");
	}, []);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลไปรษณีย์ปลายทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					className="h-full w-full"
					label="รหัสไปรษณีย์"
					type={DROPDOWN_TYPE.ADDRESS}
					value={_.isEmpty(postalName) ? null : postalName}
					getValue={(e) => {
						setPostalCode(e.postalCode);
						setPostalName(e.postalName);
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isEmpty(postalCode)}
				onClick={() => {
					// dispatch(
					// 	handleDoctorDetailRows({
					// 		diplomaType: diplomaType,
					// 		doctorCode: doctor.doctorCode,
					// 		doctorDetailGrid,
					// 		editId,
					// 	})
					// );
					setPostalCode("");
				}}
				label="บันทึก"
			/>
		</div>
	);
}
