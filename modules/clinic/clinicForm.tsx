"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicDetail } from "./redux";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { IsActive } from "../../constants/constants";
import * as _ from "lodash";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
import { addClinic } from "./service";

import FormGroup from "@mui/material/FormGroup";
import type { FormInstance, FormProps } from "antd";
import { Button, Form } from "antd";
import { FormItemSwitch, FormItemInput } from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import Link from "next/link";
import { LINKS } from "../../constants/links";
import { useRouter } from "next/navigation";
// import {
//   Link,
// } from "react-router-dom";

export default function ClinicForm() {
	// export const ClinicForm: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance | null>(null);

	const router = useRouter();

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

	const onFinish: FormProps<ClinicDetail>["onFinish"] = (values) => {
		console.log("Success:", values);
		dispatch(addClinic(clinicDetail, router));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (
		errorInfo
	) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			{/* <IconButton text="test" size="small" /> */}
			<FormControl component="fieldset" variant="outlined">
				<FormGroup>
					<Form
						name="basic"
						// labelCol={{ span: 8 }}
						// wrapperCol={{ span: 16 }}
						// style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						size="large"
						form={form}
						ref={formRef}
					>
						<Grid container rowSpacing={3} spacing={5}>
							<Grid item xs={6}>
								<FormItemInput
									// labelPosition={FormItemPosition.LEFT}
									// labelLeftSpan={6}
									label="Clinic Code"
									isRequired={true}
									itemName="clinicCode"
									rules={[
										{
											required: true,
											message: "Please input your Clinic Code!",
										},
										{
											min: 4,
											message: "Number must be exactly 4 characters",
										},
										{
											max: 4,
											message: "Number must be exactly 4 characters",
										},
									]}
									value={clinicDetail.clinicCode}
									maxLength={4}
									onChangeFunction={(e) => {
										dispatch(
											setClinicDetail({
												...clinicDetail,
												clinicCode: e.target.value,
											})
										);
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormItemInput
									label="Clinic Name"
									isRequired={true}
									itemName="clinicName"
									rules={[
										{
											required: true,
											message: "Please input your Clinic Name!",
										},
										{
											min: 1,
											message: "Clinic Name must be atleast 1 characters",
										},
										{
											max: 200,
											message: "Clinic Name must not exceed 200 characters",
										},
									]}
									value={clinicDetail.clinicName}
									maxLength={200}
									onChangeFunction={(e) => {
										dispatch(
											setClinicDetail({
												...clinicDetail,
												clinicName: e.target.value,
											})
										);
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormItemSwitch
									labelPosition={FormItemPosition.LEFT}
									itemName={"clinicDetail.isActive"}
									label="สถานะการเปิดใช้งาน"
									checked={
										_.trim(clinicDetail.isActive) === IsActive.Y ? true : false
									}
									onChangeFunction={(e) => {
										dispatch(
											setClinicDetail({
												...clinicDetail,
												isActive: e ? IsActive.Y : IsActive.N,
											})
										);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={4}>
									<Grid item>
										<Button type="primary" htmlType="submit">
											บันทึก
										</Button>
									</Grid>
									<Grid item>
										<Link key={LINKS.CLINIC.link} href={LINKS.CLINIC.link}>
											<Button>ยกเลิก</Button>
										</Link>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Form>
				</FormGroup>
			</FormControl>
			{/* <Button
				type="primary"
				// onClick={useCallback(() => {
				// 	if (formRef.current) {
				// 		formRef.current.submit();
				// 	}
				// }, [])}
				onClick={() => {
					if (formRef.current) {
						formRef.current.submit();
					}
				}}
			>
				Submit2
			</Button> */}
		</div>
	);
}
