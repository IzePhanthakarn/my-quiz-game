import * as React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { PaginationOptions } from "./redux/model";
import { setPagination } from "@/modules/clinic/redux";
import Pagination, { PaginationProps } from "antd/es/pagination";
import "./style.css";
interface Props {
	page: PaginationOptions;
}

export default function BasePagination(prop: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { page } = prop;
	const handleShowSizeChange: PaginationProps["onShowSizeChange"] = (
		_,
		size
	) => {
		dispatch(setPagination({ ...page, pageNumber: 0, pageSize: size }));
	};

	const handlePageChange: PaginationProps["onChange"] = (newPage, size) => {
		if (size !== page.pageSize) {
			return;
		}
		dispatch(setPagination({ ...page, pageNumber: newPage - 1 }));
	};

	const locale = {
		items_per_page: "",
	};

	return (
		<div className="flex justify-end items-center">
			<span>แถวต่อหน้า: </span>
			<Pagination
				simple
				current={page.pageNumber + 1}
				defaultCurrent={page.pageNumber + 1}
				defaultPageSize={page.pageSize}
				total={page.totalData}
				showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
				onChange={handlePageChange}
				pageSizeOptions={["10", "50", "100"]}
				onShowSizeChange={handleShowSizeChange}
				locale={locale}
			/>
		</div>
	);
}
