import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { PageSearch } from "wcf-component-lib/node_modules/iconoir-react";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = [
		{
			title: <p className="text-center">รหัส</p>,
			dataIndex: "code",
			key: "code",
		},
		{
			title: <p className="text-center">ชื่อรายงาน</p>,
			dataIndex: "name",
			key: "name",
		},
		{
			title: <p className="text-center">หมายเหตุ</p>,
			dataIndex: "ps",
			key: "ps",
		},
		{
			title: <p className="text-center">ประเภท</p>,
			dataIndex: "type",
			key: "type",
		},
		{
			title: "รายละเอียด",
			dataIndex: "path",
			key: "path",

			align: "center",
			render: (_, { path }) => (
				<div className="flex justify-center">
					<PageSearch
						onClick={() => router.push(path)}
						className="cursor-pointer"
					/>
				</div>
			),
		},
	];
	return columns;
};
