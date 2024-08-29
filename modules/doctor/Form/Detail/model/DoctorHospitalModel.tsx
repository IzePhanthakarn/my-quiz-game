"use client";

import { DoctorHospitalList } from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";

interface Props {
	doctorHospitalGrid: DoctorHospitalList[];
	dispatch: AppDispatch;
}

export const GetColumns = (props: Props) => {
	const { doctorHospitalGrid, dispatch } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "เลขทะเบียน สปส",
				dataIndex: "doctorCode",
				key: "doctorCode",
			},
			{
				title: "รหัสโรงพยาบาล",
				dataIndex: "hospitalWcfCode",
				key: "hospitalWcfCode",
			},
			{
				title: "ชื่อโรงพยาบาล",
				dataIndex: "hospitalWcfName",
				key: "hospitalWcfName",
			},
			{
				title: "ลักษณะงานที่รับผิดชอบ",
				dataIndex: "jobType",
				key: "jobType",
			},
			{
				title: "ตำแหน่ง",
				dataIndex: "position",
				key: "position",
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_: any, { id }: any) => {
					return (
						<CustomCellButton
							editFunction={() => {}}
							deleteFunction={() => {}}
							mode={BUTTON_MODE.EDIT_DELETE_ICON}
						/>
					);
				},
			},
		],
		[doctorHospitalGrid]
	);
	return columns;
};
