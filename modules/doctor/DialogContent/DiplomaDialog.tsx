import { DiplomaForm, modelDiplomaForm } from "@/modules/diploma/redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import { handleDoctorDetailRows } from "./service";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorDetailList, DoctorData } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
interface Props {
	doctorDetailGrid: DoctorDetailList[];
	doctor: DoctorData;
	editId?: number;
}

export default function DiplomaDialog(props: Props) {
	const { doctorDetailGrid, doctor, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [diplomaType, setDiplomaType] = React.useState("");

	useEffect(() => {
		const data = _.find(doctorDetailGrid, ["id", editId]);
		setDiplomaType(data?.diplomaType ?? "");
	}, [doctorDetailGrid, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<div className="w-full">
				<BaseDropDown
					notForm={true}
					className="h-full w-full"
					label="วุฒิบัตรเฉพาะทาง"
					itemName="diploma"
					type="diploma"
					value={_.isEmpty(diplomaType) ? null : diplomaType}
					getValue={(e) => {
						setDiplomaType(e);
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isEmpty(diplomaType)}
				onClick={() => {
					dispatch(
						handleDoctorDetailRows({
							diplomaType: diplomaType,
							doctorCode: doctor.doctorCode,
							doctorDetailGrid,
							editId,
						})
					);
					setDiplomaType("");
				}}
				label="บันทึก"
			/>
		</div>
	);
}
