"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { FormItemInput } from "wcf-component-lib/src/components/FormItemInput";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { IsActive } from "@/constants/constants";
import { setMedicalAmountForm } from "./redux";
import { MedicalAmountForm, modelMedicalAmount } from "./redux/model";
import {
	addMedicalAmount,
	initGetMedicalAmountDetail,
	updateMedicalAmount,
} from "./service";
import { medicalAmountRules } from "./field-validation/medicalAmountForm";
import FormDatePicker from "wcf-component-lib/src/components/FormDatePicker/FormDatePicker";

const Form = (params: MedicalAmountFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			form: state.medicalAmount.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetMedicalAmountDetail(params));
				} else {
					dispatch(setMedicalAmountForm(modelMedicalAmount.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<MedicalAmountForm>["onFinish"] = (values) => {
		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateMedicalAmount(form));
		} else {
			dispatch(addMedicalAmount(form));
		}
	};

	const onFinishFailed: FormProps<MedicalAmountForm>["onFinishFailed"] = (
		_
	) => {};

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
			<BaseDialog
				isOpen={isOpen}
				content={<>ระบบบันทึกข้อมูลใหม่สำเร็จแล้ว</>}
				baseDialogType={BaseDialogType.SUCCESS}
				headerText={<>บันทึกข้อมูลสำเร็จ</>}
				setIsOpen={(value) => {
					dispatch(setIsOpenDialog(value));
					router.push(LINKS.MEDICAL_AMOUNT.link);
				}}
			/>

			{isInit && (
				<MasterDataForm
					disabled={_.isEmpty(write)}
					// initialValues={{ ...form, endEffectiveDate: null }}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setMedicalAmountForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.MEDICAL_AMOUNT.link);
					}}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<FormDatePicker
								label="Start Effective Date"
								itemName="startEffectiveDate"
								rules={medicalAmountRules.startEffectiveDateSchema}
								value={form.startEffectiveDate}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											startEffectiveDate: e,
										})
									);
								}}
							/>

							<FormDatePicker
								label="End Effective Date"
								itemName="endEffectiveDate"
								rules={medicalAmountRules.endEffectiveDateSchema}
								value={form.endEffectiveDate}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											endEffectiveDate: e,
										})
									);
								}}
							/>

							<FormItemInput
								disabled={_.isEmpty(write)}
								label="Amount"
								itemName="amount"
								rules={medicalAmountRules.amountSchema}
								value={form.amount}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											amount: e.target.value,
										})
									);
								}}
							/>
							<FormItemInput
								disabled={_.isEmpty(write)}
								label="Fare Amount"
								itemName="fareAmount"
								rules={medicalAmountRules.fareAmountSchema}
								value={form.fareAmount}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											fareAmount: e.target.value,
										})
									);
								}}
							/>
							<FormItemInput
								disabled={_.isEmpty(write)}
								label="Amount Limit"
								itemName="amountLimit"
								rules={medicalAmountRules.amountLimitSchema}
								value={form.amountLimit}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											amountLimit: e.target.value,
										})
									);
								}}
							/>
							<FormItemInput
								disabled={_.isEmpty(write)}
								label="Notice"
								itemName="notice"
								rules={medicalAmountRules.noticeSchema}
								value={form.notice}
								onChangeFunction={(e) => {
									dispatch(
										setMedicalAmountForm({
											...form,
											notice: e.target.value,
										})
									);
								}}
							/>
						</div>
					}
				/>
			)}
		</div>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
