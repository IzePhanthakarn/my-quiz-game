"use client";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
// import { Download } from "wcf-component-lib/node_modules/iconoir-react";
import FileTextOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/FileTextOutlined";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LINKS } from "../../../constants/links";
import { convertDateFormatBuddhist } from "wcf-component-lib/src/utils/dayjsThai";
import { DateFormatBuddhist } from "wcf-component-lib/src/constants/date-format.constant";

export const EstimateAddGrid = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: "ลำดับที่",
				key: "noSeq",
				dataIndex: "noSeq",
			},
			{
				sorter: true,
				key: "name",
				dataIndex: "name",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"name"}
						label="ชื่อ - สกุล"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { userFirstName, userLastName }) => {
					return (
						<>
							{userFirstName} {userLastName}
						</>
					);
				},
			},
			{
				sorter: true,
				key: "email",
				dataIndex: "email",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"email"}
						label="อีเมลล์"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { email }) => {
					return <>{email}</>;
				},
			},
			{
				sorter: true,
				key: "hospitalName",
				dataIndex: "hospitalName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalName"}
						label="ชื่อสถานพยาบาล"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { hospitalName }) => {
					return <>{hospitalName}</>;
				},
			},
			{
				sorter: true,
				key: "notifyDate",
				dataIndex: "notifyDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"notifyDate"}
						label="วันที่แจ้ง"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { notifyDate }) => {
					return (
						<>
							{convertDateFormatBuddhist(
								notifyDate,
								DateFormatBuddhist.DDMMBBBB
							)}
						</>
					);
				},
			},
			// {
			// 	key: "uuid",
			// 	title: "คำสั่ง",
			// 	dataIndex: "uuid",
			// 	render: (_) => {
			// 		return (
			// 			<FileTextOutlined
			// 				style={{
			// 					backgroundColor: "#e7f3f5",
			// 					padding: "10px",
			// 					borderRadius: "99%",
			// 					cursor: "pointer",
			// 					color: "#1c4651",
			// 				}}
			// 				onClick={() => {
			// 					router.push(LINKS.HOSPITAL.hospitalAssessment.form);
			// 				}}
			// 			/>
			// 		);
			// 	},
			// },
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<CustomCellButton
							editFunction={() =>
								router.push(LINKS.HOSPITAL.hospitalAssessment.edit + uuid)
							}
							mode={BUTTON_MODE.EDIT_ONLY_ICON}
						/>
					);
				},
			},
		],
		[]
	);
	return columns;
};
