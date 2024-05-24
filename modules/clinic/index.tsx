"use client";

import { AppDispatch, RootState } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid/models";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function Clinic() {
  const dispatch: AppDispatch = useDispatch();
  const { clinic } = useSelector(
    (state: SliceModel) => ({
      clinic: state.clinic.infomation,
    }),
    shallowEqual
  );

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="flex">
        <TextField value={clinic.clinicCode} />
        <TextField value={clinic.clinicName} />
      </div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
