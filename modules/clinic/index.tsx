"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initClinicGrid } from "./service";
import { setFieldValue } from "@/redux/slices/crud";
import { columns } from "./model";
import BaseGrid from "@/components/BaseGrid";
import Button from "@mui/material/Button";
import BaseDrawer from "@/components/BaseDrawer";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import FilterForm from "@/components/BaseDrawer/contents/filterForm";

export default function Clinic() {
  const dispatch: AppDispatch = useDispatch();
  const { form, rows, isOpen } = useSelector(
    (state: SliceModel) => ({
      form: state.crud.formData,
      rows: state.clinic.grid,
      isOpen: state.drawer.isOpen,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(initClinicGrid());
  }, []);

  return (
    <div className="w-full flex flex-col relative">
      <p></p>
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
        <Button onClick={() => dispatch(setIsOpenDrawer(true))}>
          {isOpen ? "true" : "false"}
        </Button>
      </div>
      <BaseGrid rows={rows} columns={columns} label={"ทดสอบหัวข้อ"} />
      <BaseDrawer isOpen={isOpen} content={<FilterForm />} />
    </div>
  );
}
