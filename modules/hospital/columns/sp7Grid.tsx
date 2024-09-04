"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { fetchHospitalSp7List, updateInActiveHospitalSp7 } from "../service";
import {
	HospitalSp7,
	HospitalSp7GridData,
} from "@/modules/hospital/redux/models/sp7Model";

interface Props {
	hospitalSp7: HospitalSp7;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const Sp7Grid = (props: Props) => {
	const { hospitalSp7, dispatch, params } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: "สถานะ",
				key: "isActive",
				dataIndex: "isActive",
				width: 150,
				render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			},
			{
				sorter: true,
				key: "sp7StartDated",
				dataIndex: "sp7StartDated",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"sp7StartDated"}
						label="วันที่ออกใบอนุญาต"
						sort={columns?.sortColumns}
					/>
				),
			},
			// {
			// 	sorter: true,
			// 	key: "sp7EndDate",
			// 	dataIndex: "sp7EndDate",
			// 	title: (columns: ColumnTitleProps<any>) => (
			// 		<CustomHeaderSort
			// 			columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
			// 			headerKey={"sp7EndDate"}
			// 			label="วันที่สิ้นสุดใบอนุญาต"
			// 			sort={columns?.sortColumns}
			// 		/>
			// 	),
			// },
			// {
			// 	sorter: true,
			// 	key: "fileName",
			// 	dataIndex: "fileName",
			// 	title: (columns: ColumnTitleProps<any>) => (
			// 		<CustomHeaderSort
			// 			columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
			// 			headerKey={"fileName"}
			// 			label="ชื่อไฟล์ สพ.7"
			// 			sort={columns?.sortColumns}
			// 		/>
			// 	),
			// },
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<DeleteFilled
							onClick={async () => {
								await dispatch(updateInActiveHospitalSp7(uuid));
								await dispatch(fetchHospitalSp7List(params, hospitalSp7));
							}}
						/>
					);
				},
			},
		],
		[hospitalSp7, params]
	);
	return columns;
};
