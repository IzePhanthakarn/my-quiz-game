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
import {
	fetchHospitalAttachmentList,
	// updateInActiveHospitalAttachment,
} from "../service";
import {
	HospitalAttachment,
	HospitalAttachmentGridData,
} from "@/modules/hospital/redux/models/attachmentModel";

interface Props {
	hospitalAttachment: HospitalAttachment;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const HospitalAttachmentGrid = (props: Props) => {
	const { hospitalAttachment, dispatch, params } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: true,
				key: "attachmentName",
				dataIndex: "attachmentName",
				// width: 150,

				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"attachmentName"}
						label="ชื่อไฟล์ ภาคผนวกและอื่นๆ"
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
								// await dispatch(updateInActiveHospitalAttachment(uuid));
								// await dispatch(
								// 	fetchHospitalAttachmentList(params, hospitalAttachment)
								// );
							}}
						/>
					);
				},
			},
		],
		[hospitalAttachment, params]
	);
	return columns;
};
