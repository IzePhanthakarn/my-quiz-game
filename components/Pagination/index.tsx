import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { PaginationOptions } from "./redux/model";
import { setPagination } from "@/modules/clinic/redux";

interface Props {
	page: PaginationOptions;
}

export default function Pagination(prop: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { page } = prop;
	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		dispatch(setPagination({ ...page, pageNumber: newPage }));
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatch(
			setPagination({
				...page,
				pageNumber: 0,
				pageSize: parseInt(event.target.value, 10),
			})
		);
	};
	return (
		<TablePagination
			component="div"
			count={page.totalData}
			page={page.pageNumber}
			rowsPerPageOptions={[10, 50, 100]}
			onPageChange={handleChangePage}
			rowsPerPage={page.pageSize}
			onRowsPerPageChange={handleChangeRowsPerPage}
			labelRowsPerPage="แถวต่อหน้า"
		/>
	);
}
