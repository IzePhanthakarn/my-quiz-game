import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

interface Props {
  rows: any;
  columns: GridColDef[];
  label?: string;
}

export default function BaseGrid(props: Props) {
  const { rows, columns, label } = props;
  return (
    <div className="w-full flex flex-col px-4 ">
      <div className="py-4 px-2">
        <p className="text-2xl">{label}</p>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </div>
  );
}
