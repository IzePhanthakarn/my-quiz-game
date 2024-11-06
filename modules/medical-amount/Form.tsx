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
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";
import { medicalAmountName } from "./interfaces/names";

const MedAmountForm = (params: MedicalAmountFormPageProps) => {
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

	const [extraForm] = Form.useForm();

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
					onValuesChange={(e) => {
						dispatch(
							setMedicalAmountForm({
								...form,
								...e,
							})
						);
					}}
					textHeader="ข้อมูลอัตราจ่ายค่าตอบแทนแพทย์"
					extraForm={extraForm}
					initialValues={{
						...form,
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
					inputs={
						<>
							<div className="grid gap-x-7 gap-y-2 grid-cols-3">
								<BaseItemDatePicker
									pageLevel="edit"
									label={medicalAmountName.startEffectiveDate}
									itemName="startEffectiveDate"
									rules={medicalAmountRules.startEffectiveDateSchema}
									itemForm={extraForm}
								/>
								<BaseItemDatePicker
									pageLevel="edit"
									label={medicalAmountName.endEffectiveDate}
									itemName="endEffectiveDate"
									// rules={medicalAmountRules.endEffectiveDateSchema}
									itemForm={extraForm}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-3">
								<BaseItemInput
									pageLevel="edit"
									label={medicalAmountName.amount}
									itemName="amount"
									rules={medicalAmountRules.amountSchema}
								/>
								<BaseItemInput
									pageLevel="edit"
									label={medicalAmountName.fareAmount}
									itemName="fareAmount"
									rules={medicalAmountRules.fareAmountSchema}
								/>
								<BaseItemInput
									pageLevel="edit"
									label={medicalAmountName.amountLimit}
									itemName="amountLimit"
									rules={medicalAmountRules.amountLimitSchema}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel="edit"
									label={medicalAmountName.notice}
									itemName="notice"
									rules={medicalAmountRules.noticeSchema}
								/>
							</div>
						</>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(MedAmountForm), { ssr: false });
