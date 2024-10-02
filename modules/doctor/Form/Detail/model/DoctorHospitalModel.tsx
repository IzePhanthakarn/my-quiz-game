"use client";

import { DoctorHospitalList } from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import HospitalDialog from "@/modules/doctor/DialogContent/HospitalDialog";
import { handleHospitalRows } from "@/modules/doctor/DialogContent/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { LtPropertiesForm } from "@/modules/lt-properties/redux/model";
import { modelDialog } from "@/redux/slices/dialog/model";

interface Props {
	doctorHospitalGrid: DoctorHospitalList[];
	doctorCode: string;
	dispatch: AppDispatch;
}

export const GetColumns = (props: Props) => {
	const { doctorHospitalGrid, doctorCode, dispatch } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "เลขทะเบียน สปส",
				render: () => {
					return <p>{doctorCode}</p>;
				},
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
				render: (_: any, { jobType }: any) => {
					const sessionJobType = JSON.parse(
						sessionStorage.getItem(SESSION_NAME.JOB_TYPE) ?? "[]"
					);
					const data: LtPropertiesForm[] = sessionJobType.filter(
						(item: LtPropertiesForm) => item.propertyCode === jobType
					);
					return <p>{data[0]?.propertyText ?? ""}</p>;
				},
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
							editFunction={() => {
								dispatch(
									setDialog({
										...modelDialog,
										isOpen: true,
										uniqueContent: <HospitalDialog {...props} editId={id} />,
									})
								);
							}}
							deleteFunction={() => {
								dispatch(
									handleHospitalRows({
										doctorHospitalGrid,
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
		[doctorHospitalGrid]
	);
	return columns;
};
