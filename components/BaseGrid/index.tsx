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
    <div className="w-full flex flex-col">
      {label && (
        <div className="py-4">
          <p className="text-2xl">{label}</p>
        </div>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableColumnMenu={true}
      />
    </div>
  );
}
