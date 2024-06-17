import React from "react";
import Pagination from "../Pagination";
import { PaginationOptions } from "../Pagination/redux/model";
import Table, { TableProps } from "antd/es/table";

interface Props {
	rows: any;
	columns: TableProps["columns"];
	label?: string;
	page: PaginationOptions;
	loading?: boolean;
}

export default function BaseGrid(props: Props) {
	const { rows, columns, label, loading = false, page } = props;
	return (
		<div className="w-full">
			{label && (
				<div className="py-4">
					<p className="text-2xl">{label}</p>
				</div>
			)}
			<Table
				dataSource={rows}
				loading={loading}
				columns={columns}
				scroll={{ y: 400 }}
				pagination={false}
			/>
			{/* <Pagination page={props.page} /> */}
		</div>
	);
}
