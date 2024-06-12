import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

interface PaginationState {
	// page?: number;
	rowsData?: number;
	onClickForward?: () => void;
	onClickBack?: () => void;
	onEnterPage?: (page: number) => void;
}

export default function Pagination(props: PaginationState) {
	const { rowsData, onClickForward, onClickBack, onEnterPage } = props;
	const [page, setPage] = React.useState(2);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<TablePagination
			component="div"
			count={100}
			page={page}
			onPageChange={handleChangePage}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			labelRowsPerPage="แถวต่อหน้า"
		/>
	);
}
