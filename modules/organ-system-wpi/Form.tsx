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
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setOrganSystemWpiForm } from "./redux";
import { OrganSystemWpiForm, modelOrganSystemWpi } from "./redux/model";
import { organSystemWpiFormRules } from "./field-validation/organSystemWpiForm";
import {
	addOrganSystemWpi,
	initOrganSystemWpiDetail,
	updateOrganSystemWpi,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import { organSystemWpiName } from "./interfaces/name";

const Form = (params: CourseCategoryFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.organSystemWpi.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initOrganSystemWpiDetail(params));
				} else {
					dispatch(setOrganSystemWpiForm(modelOrganSystemWpi.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<OrganSystemWpiForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<OrganSystemWpiForm>["onFinishFailed"] = (
		_
	) => {};
	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateOrganSystemWpi(form, router));
					} else {
						dispatch(addOrganSystemWpi(form, router));
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
					textHeader="อวัยวะ"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setOrganSystemWpiForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.ORGAN_SYSTEM_WPI.link);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={organSystemWpiName.organSystemNo}
									itemName="organSystemNo"
									rules={organSystemWpiFormRules.organSystemNo}
									value={form.organSystemNo}
									onChangeFunction={(e) => {
										dispatch(
											setOrganSystemWpiForm({
												...form,
												organSystemNo: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={organSystemWpiName.description}
									itemName="description"
									rules={organSystemWpiFormRules.description}
									value={form.description}
									onChangeFunction={(e) => {
										dispatch(
											setOrganSystemWpiForm({
												...form,
												description: e.target.value,
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
