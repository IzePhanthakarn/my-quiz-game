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
import { setDocumentForm } from "./redux";
import { DocumentForm, modelDocument } from "./redux/model";
import { addDocument, initGetDocumentDetail, updateDocument } from "./service";
import {
	disabledName,
	documentNameName,
	documentRules,
	isNecessaryName,
	remarkName,
} from "./field-validation/form";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";

const Form = (params: DocumentFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.document.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetDocumentDetail(params));
				} else {
					dispatch(setDocumentForm(modelDocument.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<DocumentForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<DocumentForm>["onFinishFailed"] = (_) => {};

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
						dispatch(updateDocument(form, router));
					} else {
						dispatch(addDocument(form, router));
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
					textHeader="Document"
					disabled={_.isEmpty(write)}
					initialValues={{
						...form,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					disabledHistoryButton
					onChangeSwitchFunction={(e) => {
						dispatch(
							setDocumentForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.DOCUMENT.link);
					}}
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					inputs={
						<>
							<div className="grid gap-x-7 gap-y-2 grid-cols-3">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={documentNameName}
									itemName="documentName"
									rules={documentRules.documentNameSchema}
									value={form.documentName}
									onChangeFunction={(e) => {
										dispatch(
											setDocumentForm({
												...form,
												documentName: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={isNecessaryName}
									itemName="isNecessary"
									rules={documentRules.isNecessarySchema}
									value={form.isNecessary}
									onChangeFunction={(e) => {
										dispatch(
											setDocumentForm({
												...form,
												isNecessary: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={disabledName}
									itemName="disabled"
									rules={documentRules.disabledSchema}
									value={form.disabled}
									onChangeFunction={(e) => {
										dispatch(
											setDocumentForm({
												...form,
												disabled: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									disabled={_.isEmpty(write)}
									label={remarkName}
									itemName="remark"
									rules={documentRules.remarkSchema}
									value={form.remark}
									onChangeFunction={(e) => {
										dispatch(
											setDocumentForm({
												...form,
												remark: e.target.value,
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
