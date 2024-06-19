"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicDetail, setClinicDetailError } from "./redux";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
// import Switch from "@mui/material/Switch";
import { IsActive, IsDelete } from "../../constants/constants";
import * as _ from "lodash";
// import Button from "@mui/material/Button";
import Link from "next/link";
import { LINKS } from "../../constants/links";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
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
import type { FormInstance, FormProps } from "antd";
import { Switch, Button, Checkbox, Form, Input } from "antd";
import { IconButton, Counter } from "wcf-component-lib/src";
import FormItemInput from "../../components/FormItemInput";
import FormItemSwitch from "../../components/FormItemSwitch";

export default function ClinicForm() {
	// export const ClinicForm: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance | null>(null);

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

	const onFinish: FormProps<ClinicDetail>["onFinish"] = (values) => {
		console.log("Success:", values);
		dispatch(addClinic(clinicDetail));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (
		errorInfo
	) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<IconButton text="test" size="small" />
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
									itemName={"clinicDetail.isActive"}
									label="สถานะการเปิดใช้งาน"
									checked={
										_.trim(clinicDetail.isActive) === IsDelete.Y ? true : false
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
										{/* <Button
											type="submit"
											variant="contained"
											// onClick={() => {
											// 	// dispatch(addClinic(clinicDetail));
											// }}
										>
											บันทึก
										</Button> */}
										<Button type="primary" htmlType="submit">
											Submit
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
					</Form>
				</FormGroup>
			</FormControl>
			<Button
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
			</Button>
		</div>
	);
}
