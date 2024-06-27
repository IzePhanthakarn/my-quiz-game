"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicDetail } from "./redux";
import { IsActive } from "../../constants/constants";
import * as _ from "lodash";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
import { addClinic } from "./service";

import type { FormInstance, FormProps } from "antd";
import { Button, Col, Row } from "antd";
import {
	FormItemSwitch,
	FormItemInput,
	FormSubmitButton,
} from "wcf-component-lib/src";
import { FormWrapper } from "wcf-component-lib/src/components/FormWrapper";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import Link from "next/link";
import { LINKS } from "../../constants/links";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
	clinicCodeSchema,
	clinicNameSchema,
} from "./field_validation/clinicForm";

const ClinicForm = () => {
	// export const ClinicForm: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	// const formRef = useRef<FormInstance | null>(null);

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
		// console.log("test Success:", values);
		dispatch(addClinic(clinicDetail, router));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (
		errorInfo
	) => {
		// console.log("test Failed:", errorInfo);
	};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<FormWrapper
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				name="clinicForm"
				child={
					<>
						<Row gutter={24}>
							<Col span={12}>
								<FormItemInput
									// labelPosition={FormItemPosition.LEFT}
									// labelLeftSpan={6}
									label="Clinic Code"
									itemName="clinicCode"
									rules={clinicCodeSchema}
									value={clinicDetail.clinicCode}
									onChangeFunction={(e) => {
										dispatch(
											setClinicDetail({
												...clinicDetail,
												clinicCode: e.target.value,
											})
										);
									}}
								/>
							</Col>
							<Col span={12}>
								<FormItemInput
									label="Clinic Name"
									itemName="clinicName"
									rules={clinicNameSchema}
									value={clinicDetail.clinicName}
									onChangeFunction={(e) => {
										dispatch(
											setClinicDetail({
												...clinicDetail,
												clinicName: e.target.value,
											})
										);
									}}
								/>
							</Col>
							<Col span={24}>
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
							</Col>

							<Col span={24}>
								<FormSubmitButton
									type="primary"
									className="text-xl font-semibold"
									label="บันทึก"
								/>

								<Link key={LINKS.CLINIC.link} href={LINKS.CLINIC.link}>
									<Button className="text-xl font-semibold ml-5">ยกเลิก</Button>
								</Link>
							</Col>
						</Row>
					</>
				}
			/>
		</div>
	);
};

export default dynamic(() => Promise.resolve(ClinicForm), { ssr: false });
