"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addClinic, initGetClinicDetail, updateClinic } from "./service";
import { setClinicDetail } from "./redux";
import { IsActive } from "../../constants/constants";
import * as _ from "lodash";
import { LINKS } from "../../constants/links";
import dayjs from "dayjs";
import { DateFormat } from "../../constants/date-format.constant";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "antd/es/form/Form";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
import { useRouter } from "next/navigation";
import Row from "antd/es/row";
import Col from "antd/es/grid/col";
import { FormItemInput } from "wcf-component-lib/src/components/FormItemInput";
import {
	clinicCodeSchema,
	clinicNameSchema,
} from "./field-validation/clinicForm";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";

const Form = (params: ClinicFormPageProps) => {
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
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetClinicDetail(params));
				} else {
					await dispatch(setClinicDetail(modelClinicDetail));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<ClinicDetail>["onFinish"] = (values) => {
		if (_.isEmpty(params.params.uuid)) {
			dispatch(addClinic(clinicDetail, router));
		} else {
			dispatch(updateClinic(clinicDetail));
		}
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (_) => {};

	const scopes = [
		"location:read",
		"location:write",
		"resource:read",
		"resource:write",
		"netdb:select",
		"netdb:update",
		"changs-req:read",
		"changs-req:write",
	];

	const resourceScopes = findScope(scopes, "resource:");
	const { write } = getScopesPermissions(resourceScopes);

	return (
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
			{isInit && (
				<MasterDataForm
					disabled={_.isEmpty(write) ? true : false}
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
								<Col span={6}>
									<FormItemInput
										disabled={_.isEmpty(write) ? true : false}
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
								<Col span={6}>
									<FormItemInput
										disabled={_.isEmpty(write) ? true : false}
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
export default dynamic(() => Promise.resolve(Form), { ssr: false });
