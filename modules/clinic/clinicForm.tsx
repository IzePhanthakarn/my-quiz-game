"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicDetail, setClinicDetailError } from "./redux";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { IsDelete } from "../../constants/constants";
import * as _ from "lodash";
import Button from "@mui/material/Button";
import Link from "next/link";
import { LINKS } from "../../constants/links";
import { modelClinicDetail } from "./redux/model";
import { addClinic } from "./service";
import { useRouter } from "next/router";
import { Label } from "@mui/icons-material";
import {
	clinicCodeSchema,
	validationSchema,
	FormData,
} from "./field_validation/clinicForm";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "@mui/material/FormGroup";

export default function ClinicForm() {
	// export const ClinicForm: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { clinicDetail, clinicDetailError } = useSelector(
		(state: SliceModel) => ({
			clinicDetail: state.clinic.clinicDetail,
			clinicDetailError: state.clinic.clinicDetailError,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (!isInit) {
			dispatch(setClinicDetail(modelClinicDetail));
			setIsInit(true);
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
		mode: "onBlur",
		reValidateMode: "onBlur",
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(123, data);
	};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<FormControl component="fieldset" variant="outlined">
				<FormGroup>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container rowSpacing={3} spacing={5}>
							<Grid item xs={6}>
								<div>
									<FormLabel>
										Clinic Code <span className="text-red-600">*</span>
									</FormLabel>
								</div>
								<div>
									<TextField
										{...register("clinicCode")}
										fullWidth
										inputProps={{ maxLength: 4 }}
										onChange={async (e) => {
											dispatch(
												setClinicDetail({
													...clinicDetail,
													clinicCode: e.target.value,
												})
											);
											trigger("clinicCode");
										}}
										// onBlur={async (e) => {
										// 	trigger("clinicCode");
										// }}
										value={clinicDetail.clinicCode}
										error={!!errors.clinicCode}
										helperText={errors.clinicCode?.message}
									/>
								</div>
							</Grid>
							<Grid item xs={6}>
								<div>
									<FormLabel>
										Clinic Name <span className="text-red-600">*</span>
									</FormLabel>
								</div>
								<div>
									<TextField
										{...register("clinicName")}
										fullWidth
										inputProps={{ maxLength: 200 }}
										onChange={(e) => {
											dispatch(
												setClinicDetail({
													...clinicDetail,
													clinicName: e.target.value,
												})
											);
										}}
										value={clinicDetail.clinicName}
										error={!!errors.clinicName}
										helperText={errors.clinicName?.message}
									/>
								</div>
							</Grid>
							<Grid item xs={6}>
								<div>
									<FormLabel>สถานะการเปิดใช้งาน</FormLabel>
								</div>
								<div>
									<Switch
										checked={
											_.trim(clinicDetail.isActive) === IsDelete.Y
												? true
												: false
										}
										onChange={(e) => {
											dispatch(
												setClinicDetail({
													...clinicDetail,
													isActive:
														_.trim(clinicDetail.isActive) === IsDelete.Y
															? IsDelete.N
															: IsDelete.Y,
												})
											);
										}}
										inputProps={{ "aria-label": "controlled" }}
									/>
								</div>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={4}>
									<Grid item>
										<Button
											type="submit"
											variant="contained"
											// onClick={() => {
											// 	// dispatch(addClinic(clinicDetail));
											// }}
										>
											บันทึก
										</Button>
									</Grid>
									<Grid item>
										{/* <Link key={LINKS.CLINIC.link} href={LINKS.CLINIC.link}>
											<Button variant="outlined">ยกเลิก</Button>
										</Link> */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</FormGroup>
			</FormControl>
		</div>
	);
}
