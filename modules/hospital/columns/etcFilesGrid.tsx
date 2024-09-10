"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import {
	fetchHospitalEtcFilesList,
	updateInActiveHospitalEtcFiles,
} from "../service";
import {
	HospitalEtcFiles,
	HospitalEtcFilesGridData,
} from "@/modules/hospital/redux/models/etcFilesModel";

interface Props {
	hospitalEtcFiles: HospitalEtcFiles;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const EtcFilesGrid = (props: Props) => {
	const { hospitalEtcFiles, dispatch, params } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: true,
				key: "fileName",
				dataIndex: "fileName",
				// width: 150,

				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
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
								await dispatch(updateInActiveHospitalEtcFiles(uuid));
								await dispatch(
									fetchHospitalEtcFilesList(params, hospitalEtcFiles)
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalEtcFiles, params]
	);
	return columns;
};
