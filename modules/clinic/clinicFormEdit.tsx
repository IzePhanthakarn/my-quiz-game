"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initGetClinicDetail, updateClinic } from "./service";
import { setClinicDetail } from "./redux";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { IsDelete } from "../../constants/constants";
import * as _ from "lodash";
import Button from "@mui/material/Button";
import Link from "next/link";
import { LINKS } from "../../constants/links";
import dayjs from "dayjs";
import { DateFormat } from "../../constants/date-format.constant";

export default function ClinicFormEdit(params: ClinicFormPageProps) {
	const dispatch: AppDispatch = useDispatch();
	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { clinicDetail } = useSelector(
		(state: SliceModel) => ({
			clinicDetail: state.clinic.clinicDetail,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (!isInit && params.params.uuid !== "") {
			dispatch(initGetClinicDetail(params));
			setIsInit(true);
		}
	}, []);
	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<FormControl>
				<Grid container rowSpacing={3} spacing={5}>
					<Grid item xs={6}>
						<div>
							<FormLabel>
								Clinic Code
								{/* <span className="text-red-600">*</span> */}
							</FormLabel>
						</div>
						<div>
							<TextField
								fullWidth
								disabled
								// onChange={(e) => {
								// 	dispatch(
								// 		setClinicDetail({ ...clinicDetail, clinicCode: e.target.value })
								// 	);
								// }}
								value={clinicDetail.clinicCode}
							/>
						</div>
					</Grid>
					<Grid item xs={6}>
						<div>
							<FormLabel>
								Clinic Name
								<span className="text-red-600">*</span>
							</FormLabel>
						</div>
						<div>
							<TextField
								fullWidth
								onChange={(e) => {
									dispatch(
										setClinicDetail({
											...clinicDetail,
											clinicName: e.target.value,
										})
									);
								}}
								value={clinicDetail.clinicName}
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
									_.trim(clinicDetail.isActive) === IsDelete.Y ? true : false
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
							<Grid container spacing={4} item xs={6}>
								<Grid item>
									<Button
										variant="contained"
										onClick={() => dispatch(updateClinic(clinicDetail))}
									>
										บันทึก
									</Button>
								</Grid>
								<Grid item>
									<Link key={LINKS.CLINIC.link} href={LINKS.CLINIC.link}>
										<Button variant="outlined">ยกเลิก</Button>
									</Link>
								</Grid>
							</Grid>

							<Grid item xs={6} className="content-end text-right">
								<FormLabel>
									แก้ไขล่าสุดโดย {clinicDetail.updatedBy} <br></br>
									{dayjs(clinicDetail.updatedDate)
										.format(DateFormat.DDMMYYYYHHmm)
										.toString()}
								</FormLabel>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FormControl>
		</div>
	);
}
