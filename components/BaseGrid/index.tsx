import React from "react";
import BasePagination from "../Pagination";
import { PaginationOptions, SortOrdersModel } from "../Pagination/redux/model";
import Table, { TableProps } from "antd/es/table";
import _ from "lodash";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setOrder } from "@/modules/clinic/redux";
import { handleOrderBy } from "@/utils";

interface Props {
	rows: any;
	columns: TableProps["columns"];
	label?: string;
	page: PaginationOptions;
	loading?: boolean;
}

export default function BaseGrid(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { rows, columns, label, loading = false, page } = props;

	const handleTableChange = (pagination: any, filter: any, sorter: any) => {
		const order: SortOrdersModel[] = [];
		if (!_.isEmpty(sorter.order)) {
			order.push({
				direction: handleOrderBy(sorter.order),
				property: sorter.field,
			});
		}
		dispatch(setOrder(order));
	};

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
				onChange={handleTableChange}
			/>
			<BasePagination page={page} />
		</div>
	);
}
