"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { setHospitalSp19GridFilterUuidExclusionList } from "../service";
import { HospitalSp19 } from "@/modules/hospital/redux/models/sp19Model";
import { OutsideHospitalForm } from "../redux/models/hospitalModel";

interface Props {
	hospitalSp19: HospitalSp19;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
	outsideHospitalForm: OutsideHospitalForm;
}

export const Sp19Grid = (props: Props) => {
	const { hospitalSp19, dispatch, params, outsideHospitalForm } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			// {
			// 	title: "สถานะ",
			// 	key: "isActive",
			// 	dataIndex: "isActive",
			// 	width: 150,
			// 	render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			// },
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
				// width: 150,

				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
						label="ชื่อไฟล์ สพ.19"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { fileName }) => {
					return (
						<a
							href={`https://minio-wcf.soilfish.co/wcf2-public/hospital/sp19/${fileName}`}
							target="_blank"
						>
							{fileName}
						</a>
					);
				},
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<DeleteFilled
							onClick={async () => {
								await dispatch(
									setHospitalSp19GridFilterUuidExclusionList(
										hospitalSp19,
										uuid,
										params,
										outsideHospitalForm
									)
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalSp19, outsideHospitalForm, params]
	);
	return columns;
};
