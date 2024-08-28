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

interface Props {
	doctorDetailGrid: DoctorDetailList[];
	doctor: DoctorData;
}

export const getColumns = (props: Props) => (dispatch: AppDispatch) => {
	const { doctorDetailGrid } = props;

	const columns: TableProps["columns"] = [
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
			render: (_, { id }) => {
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
	];
	return columns;
};
