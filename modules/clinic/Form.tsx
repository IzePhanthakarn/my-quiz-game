"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addClinic, initGetClinicDetail, updateClinic } from "./service";
import { setClinicDetail } from "./redux";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import MasterDataFormLayout from "wcf-component-lib/src/layout/MasterDataFormLayout";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { ClinicDetail, modelClinicDetail } from "./redux/model";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import {
	clinicCodeSchema,
	clinicNameSchema,
} from "./field-validation/clinicForm";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { clinicName } from "./interface/name";
import { BaseForm } from "wcf-component-lib/src/components";

const Form = (params: UuidFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { clinicDetail, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			clinicDetail: state.clinic.clinicDetail,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				dispatch(setIsOpenDialog(false));

				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetClinicDetail(params));
				} else {
					dispatch(setClinicDetail(modelClinicDetail));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<ClinicDetail>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<ClinicDetail>["onFinishFailed"] = (_) => {};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (_.isEmpty(params.params.uuid)) {
						dispatch(addClinic(clinicDetail, router));
					} else {
						dispatch(updateClinic(clinicDetail, router));
					}
				}}
				cancelFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
				closeFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
			/>

			{isInit && (
				<MasterDataFormLayout
					textHeader="ข้อมูลคลินิก"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={clinicDetail}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(clinicDetail.isActive) === IsActive.Y}
					pageLevel="edit"
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
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								pageLevel="edit"
								label={clinicName.clinicCode}
								itemName="clinicCode"
								rules={clinicCodeSchema}
								onChangeFunction={(e) => {
									dispatch(
										setClinicDetail({
											...clinicDetail,
											clinicCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								pageLevel="edit"
								label={clinicName.clinicName}
								itemName="clinicName"
								rules={clinicNameSchema}
								onChangeFunction={(e) => {
									dispatch(
										setClinicDetail({
											...clinicDetail,
											clinicName: e.target.value,
										})
									);
								}}
							/>
						</div>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
