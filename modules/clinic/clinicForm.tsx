"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { modelClinicDetail } from "./redux/model";
import { addClinic } from "./service";

export default function ClinicForm() {
	const dispatch: AppDispatch = useDispatch();
	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { clinicDetail } = useSelector(
		(state: SliceModel) => ({
			clinicDetail: state.clinic.clinicDetail,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (!isInit) {
			dispatch(setClinicDetail(modelClinicDetail));
			setIsInit(true);
		}
	}, []);

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<FormControl>
				<Grid container rowSpacing={3} spacing={5}>
					<Grid item xs={6}>
						<div>
							<FormLabel>Clinic Code</FormLabel>
						</div>
						<div>
							<TextField
								fullWidth
								onChange={(e) => {
									dispatch(
										setClinicDetail({
											...clinicDetail,
											clinicCode: e.target.value,
										})
									);
								}}
								value={clinicDetail.clinicCode}
							/>
						</div>
					</Grid>
					<Grid item xs={6}>
						<div>
							<FormLabel>Clinic Name</FormLabel>
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
									_.trim(clinicDetail.isDeleted) === IsDelete.N ? true : false
								}
								onChange={(e) => {
									dispatch(
										setClinicDetail({
											...clinicDetail,
											isDeleted:
												_.trim(clinicDetail.isDeleted) === IsDelete.N
													? IsDelete.Y
													: IsDelete.N,
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
									variant="contained"
									onClick={() => dispatch(addClinic(clinicDetail))}
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
					</Grid>
				</Grid>
			</FormControl>
		</div>
	);
}
