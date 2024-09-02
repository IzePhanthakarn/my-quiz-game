"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import DiplomaDialog from "@/modules/doctor/DialogContent/DiplomaDialog";
import {
	DoctorData,
	DoctorDetailList,
} from "@/modules/doctor/redux/form/model";
import { handleDoctorDetailRows } from "@/modules/doctor/DialogContent/service";
import { useMemo } from "react";
import { Diploma } from "wcf-component-lib/src/components/BaseDropDown/model";
import { handleSession } from "@/components/MedDropDown/service";
import { DROPDOWN_TYPE } from "wcf-component-lib/src/constants/dropdown";

interface Props {
	doctorDetailGrid: DoctorDetailList[];
	doctor: DoctorData;
	dispatch: AppDispatch;
}

export const GetColumns = (props: Props) => {
	const { doctorDetailGrid, doctor, dispatch } = props;
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
				title: "วุฒิบัตรเฉพาะทาง",
				dataIndex: "diplomaType",
				key: "diplomaType",
				render: (_: any, { diplomaType }: any) => {
					const diploma = JSON.parse(sessionStorage.getItem("DIPLOMA") ?? "[]");
					const data: Diploma[] = diploma.filter(
						(item: Diploma) => item.diplomaType === diplomaType
					);
					return <p>{data[0].diplomaName}</p>;
				},
			},
			{
				title: "เลขทะเบียนวิชาชีพ",
				render: () => {
					return <p>{doctor.professionalCode}</p>;
				},
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_: any, { id }: any) => {
					return (
						<CustomCellButton
							editFunction={() => {
								dispatch(
									setDialog({
										isOpen: true,
										uniqueContent: <DiplomaDialog {...props} editId={id} />,
									})
								);
							}}
							deleteFunction={() => {
								dispatch(
									handleDoctorDetailRows({
										doctorDetailGrid,
										editId: id,
										isDelete: true,
									})
								);
							}}
							mode={BUTTON_MODE.EDIT_DELETE_ICON}
						/>
					);
				},
			},
		],
		[doctorDetailGrid, doctor]
	);
	return columns;
};
