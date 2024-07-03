"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicDetail } from "./redux";
import { IsActive } from "../../constants/constants";
import * as _ from "lodash";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
import { addClinic } from "./service";

import type { FormProps } from "antd";
import Row from "antd/es/row";
import Col from "antd/es/grid/col";
import { FormItemInput } from "wcf-component-lib/src";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { LINKS } from "../../constants/links";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
	clinicCodeSchema,
	clinicNameSchema,
} from "./field_validation/clinicForm";

const ClinicFormAdd = () => {
	const dispatch: AppDispatch = useDispatch();

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

	const onFinish: FormProps<ClinicDetail>["onFinish"] = (_) => {
		dispatch(addClinic(clinicDetail, router));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (_) => {};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			<MasterDataForm
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				switchCheckValue={
					_.trim(clinicDetail.isActive) === IsActive.Y ? true : false
				}
				onChangeSwitchFunction={(e) => {
					dispatch(
						setClinicDetail({
							...clinicDetail,
							isActive: e ? IsActive.Y : IsActive.N,
						})
					);
				}}
				cancelFunction={() => {
					router.push(LINKS.CLINIC.link);
				}}
				inputs={
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
						</Row>
					</>
				}
			/>
		</div>
	);
};

export default dynamic(() => Promise.resolve(ClinicFormAdd), { ssr: false });
