"use client";

import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setFilterForm } from "../redux";

export default function FilterForm() {
  const dispatch: AppDispatch = useDispatch();
  const { filterForm } = useSelector(
    (state: SliceModel) => ({
      filterForm: state.drawer.filterForm,
    }),
    shallowEqual
  );

  return (
    <Column>
      <TextField
        onChange={(e) =>
          dispatch(setFilterForm({ ...filterForm, name: e.target.value }))
        }
        value={filterForm.name}
        placeholder="ชื่อ"
      />
      <TextField
        onChange={(e) =>
          dispatch(setFilterForm({ ...filterForm, lastname: e.target.value }))
        }
        value={filterForm.lastname}
        placeholder="นามสกุล"
      />
      <TextField
        onChange={(e) =>
          dispatch(setFilterForm({ ...filterForm, cid: e.target.value }))
        }
        value={filterForm.cid}
        placeholder="เลขบัตรประชาชน"
      />
    </Column>
  );
}
