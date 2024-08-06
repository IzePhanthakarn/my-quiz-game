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
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setMedicalAmountForm } from "./redux";
import { MedicalAmountForm, modelMedicalAmount } from "./redux/model";
import {
	addMedicalAmount,
	initGetMedicalAmountDetail,
	updateMedicalAmount,
} from "./service";
import { medicalAmountRules } from "./field-validation/medicalAmountForm";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import { setToast } from "../../redux/slices/toast";

const Form = (params: MedicalAmountFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
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

	const onFinish: FormProps<MedicalAmountForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
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
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateMedicalAmount(form, router));
					} else {
						dispatch(addMedicalAmount(form, router));
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
					textHeader="100120-ส่วนงานสิทธิประโยชน์"
					disabled={_.isEmpty(write)}
					initialValues={{
						...form,
						// endEffectiveDate: !_.isEmpty(form.endEffectiveDate)
						// 	? dayjs(form.endEffectiveDate, DateFormat.YYYYMMDD).isValid()
						// 		? dayjs(form.endEffectiveDate, DateFormat.YYYYMMDD)
						// 		: undefined
						// 	: undefined,
						// startEffectiveDate: !_.isEmpty(form.startEffectiveDate)
						// 	? dayjs(form.startEffectiveDate, DateFormat.YYYYMMDD).isValid()
						// 		? dayjs(form.startEffectiveDate, DateFormat.YYYYMMDD)
						// 		: undefined
						// 	: undefined,
						// updatedDate: !_.isEmpty(form.updatedDate)
						// 	? dayjs(form.updatedDate, DateFormat.YYYYMMDD).isValid()
						// 		? dayjs(form.updatedDate, DateFormat.YYYYMMDD).format(
						// 				DateFormat.DDMMYYYY
						// 		  )
						// 		: ""
						// 	: "",
						// createdDate: !_.isEmpty(form.createdDate)
						// 	? dayjs(form.createdDate, DateFormat.YYYYMMDD).isValid()
						// 		? dayjs(form.createdDate, DateFormat.YYYYMMDD).format(
						// 				DateFormat.DDMMYYYY
						// 		  )
						// 		: ""
						// 	: "",
					}}
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
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					// updatedDate={form.updatedDate}
					// createdDate={form.createdDate}
					// createdBy={form.createdBy}
					// updatedBy={form.updatedBy}
					inputs={
						<>
							<div className="grid gap-x-7 gap-y-2 grid-cols-3">
								<BaseDatePicker
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
								<BaseDatePicker
									label="End Effective Date"
									itemName="endEffectiveDate"
									// rules={medicalAmountRules.endEffectiveDateSchema}
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
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-3">
								<BaseItemInput
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
								<BaseItemInput
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
								<BaseItemInput
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
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
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
						</>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
