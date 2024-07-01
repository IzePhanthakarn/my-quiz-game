"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initGetClinicDetail, updateClinic } from "./service";
import { setClinicDetail } from "./redux";
import { IsActive, IsDelete } from "../../constants/constants";
import * as _ from "lodash";
import { LINKS } from "../../constants/links";
import dayjs from "dayjs";
import { DateFormat } from "../../constants/date-format.constant";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "antd/es/form/Form";
import { ClinicDetail } from "./redux/model";
import { useRouter } from "next/navigation";
import Row from "antd/es/row";
import Col from "antd/es/grid/col";
import { FormItemInput } from "wcf-component-lib/src/components/FormItemInput";
import {
	clinicCodeSchema,
	clinicNameSchema,
} from "./field_validation/clinicForm";
import dynamic from "next/dynamic";

const ClinicFormEdit = (params: ClinicFormPageProps) => {
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
		(async () => {
			if (!isInit && params.params.uuid !== "") {
				await dispatch(initGetClinicDetail(params));
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<ClinicDetail>["onFinish"] = (_) => {
		dispatch(updateClinic(clinicDetail));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (_) => {};

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			{isInit && (
				<MasterDataForm
					initialValues={clinicDetail}
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
			)}
		</div>
	);
};
export default dynamic(() => Promise.resolve(ClinicFormEdit), { ssr: false });
