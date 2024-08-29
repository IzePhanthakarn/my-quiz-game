"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { TrainingList } from "@/modules/doctor/redux/form/model";
import { AppDispatch } from "@/redux/config/configStore";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";

interface Props {
	trainingGrid: TrainingList[];
	dispatch: AppDispatch;
}

export const GetColumns = (props: Props) => {
	const { trainingGrid, dispatch } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "รุ่นที่อบรม",
				dataIndex: "trainingNo",
				key: "trainingNo",
			},
			{
				title: "ปีที่อบรม",
				dataIndex: "trainingYear",
				key: "trainingYear",
			},
			{
				title: "วันที่อบรม",
				dataIndex: "trainingDate",
				key: "trainingDate",
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
		[trainingGrid]
	);
	return columns;
};
