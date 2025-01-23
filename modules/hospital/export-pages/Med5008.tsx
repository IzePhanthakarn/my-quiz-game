"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import MasterDataFormLayout from "wcf-component-lib/src/layout/MasterDataFormLayout";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { setExportPages } from "@/modules/hospital/redux";
import {
	HospitalForm,
	modelHospital,
} from "@/modules/hospital/redux/models/hospitalModel";
import { exportMed5008Function } from "@/modules/hospital/service";
import { rules } from "@/modules/hospital/field-validation/FormValidation";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import { names } from "@/modules/hospital/interfaces/names";

const Form = () => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.hospital.exportPages.med5008,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				dispatch(
					setExportPages({
						key: "med5008",
						value: modelHospital.exportPages.med5008,
					})
				);
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<HospitalForm>["onFinishFailed"] = (_) => {};

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
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					dispatch(exportMed5008Function(form));
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
					textHeader="MED5008 รายงานวันสิ้นสุดใบอนุญาตสถานพยาบาลในความตกลงของกองทุนเงินทดแทน ระบุเงื่อนไขที่ต้องการเรียกรายงาน"
					disabled={_.isEmpty(write)}
					initialValues={{
						...form,
					}}
					onFinish={onFinish}
					disabledHistoryButton
					onFinishFailed={onFinishFailed}
					switchCheckValue={false}
					onChangeSwitchFunction={(e) => {}}
					cancelFunction={() => {
						router.push(LINKS.HOSPITAL.link);
					}}
					isShowHeaderSwitch={false}
					isEdit={false}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseDatePicker
									label={names.sp7StartDated}
									itemName="sp7StartDated"
									rules={rules.sp7StartDatedSchema}
									value={form.sp7StartDated}
									onChangeDateFunction={(e) => {
										dispatch(
											setExportPages({
												key: "med5008",
												value: {
													...form,
													sp7StartDated: e,
												},
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp7EndDate}
									itemName="sp7EndDate"
									rules={rules.sp7EndDateSchema}
									value={form.sp7EndDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setExportPages({
												key: "med5008",
												value: {
													...form,
													sp7EndDate: e,
												},
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp19StartDate}
									itemName="sp19StartDate"
									rules={rules.sp19StartDateSchema}
									value={form.sp19StartDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setExportPages({
												key: "med5008",
												value: {
													...form,
													sp19StartDate: e,
												},
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp19EndDate}
									itemName="sp19EndDate"
									rules={rules.sp19EndDateSchema}
									value={form.sp19EndDate}
									onChangeDateFunction={(e) => {
										dispatch(
											setExportPages({
												key: "med5008",
												value: {
													...form,
													sp19EndDate: e,
												},
											})
										);
									}}
								/>
							</div>
						</>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
