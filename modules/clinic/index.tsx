"use client";

import { AppDispatch, RootState } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
import { setFieldValue } from "@/redux/slices/crud";

export default function Clinic() {
  const dispatch: AppDispatch = useDispatch();
  const { form, rows } = useSelector(
    (state: SliceModel) => ({
      form: state.crud.formData,
      rows: state.clinic.grid,
    }),
    shallowEqual
  );

  const columns: GridColDef[] = [
    { field: "clinicCode", headerName: "Column 1", width: 150 },
    { field: "clinicName", headerName: "Column 2", width: 400 },
  ];

  useEffect(() => {
    dispatch(initClinicGrid);
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex">
        <TextField
          value={form.clinicCode}
          onChange={(e) =>
            dispatch(
              setFieldValue({
                key: "formData",
                value: { ...form, clinicCode: e.target.value },
              })
            )
          }
        />
        <TextField
          value={form.clinicName}
          onChange={(e) =>
            dispatch(
              setFieldValue({
                key: "formData",
                value: { ...form, clinicName: e.target.value },
              })
            )
          }
        />
      </div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
