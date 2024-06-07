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
import Column from "@/components/Column";

export default function Clinic() {
  const dispatch: AppDispatch = useDispatch();
  const { form, rows } = useSelector(
    (state: SliceModel) => ({
      form: state.crud.formData,
      rows: state.clinic.grid,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(initClinicGrid());
  }, []);

  return (
    <Column>
      <Column className="px-4 mb-4">
        <p className="font-bold text-2xl leading-[48px]">คลินิค</p>
        <p className="leading-[18.75px]">คลินิค</p>
      </Column>
      <Column className="bg-white p-4">
        <div className="flex">
          <TextField
            className="mb-[10px]"
            value={form.clinicCodeName}
            placeholder="ค้นหา"
            onChange={(e) =>
              dispatch(
                setFieldValue({
                  key: "formData",
                  value: { ...form, clinicCodeName: e.target.value },
                })
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" && dispatch(initClinicGrid(form.clinicCodeName))
            }
          />
        </div>
        <BaseGrid rows={rows} columns={columns} />
      </Column>
    </Column>
  );
}
