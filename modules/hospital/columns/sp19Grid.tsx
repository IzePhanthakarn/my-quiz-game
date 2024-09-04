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
import { fetchHospitalSp19List, updateInActiveHospitalSp19 } from "../service";
import {
	HospitalSp19,
	HospitalSp19GridData,
} from "@/modules/hospital/redux/models/sp19Model";

interface Props {
	hospitalSp19: HospitalSp19;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const Sp19Grid = (props: Props) => {
	const { hospitalSp19, dispatch, params } = props;

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
				key: "sp19StartDate",
				dataIndex: "sp19StartDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"sp19StartDate"}
						label="วันที่ออกใบอนุญาต"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "sp19EndDate",
				dataIndex: "sp19EndDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"sp19EndDate"}
						label="วันที่สิ้นสุดใบอนุญาต"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "fileName",
				dataIndex: "fileName",
				width: 150,

				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
						label="ชื่อไฟล์ สพ.19"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<DeleteFilled
							onClick={async () => {
								await dispatch(updateInActiveHospitalSp19(uuid));
								await dispatch(fetchHospitalSp19List(params, hospitalSp19));
							}}
						/>
					);
				},
			},
		],
		[hospitalSp19, params]
	);
	return columns;
};
