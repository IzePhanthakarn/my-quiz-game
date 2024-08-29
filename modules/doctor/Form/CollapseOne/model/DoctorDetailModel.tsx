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
				dataIndex: "id",
				key: "id",
			},
			{
				title: (columns: ColumnTitleProps<any>) => (
					<div>
						<CustomHeaderSort
							columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
							headerKey={"diplomaType"}
							label={"diplomaType"}
							sort={columns?.sortColumns}
						/>
					</div>
				),
				dataIndex: "diplomaType",
				key: "diplomaType",
				sorter: true,
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
