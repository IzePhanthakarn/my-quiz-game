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
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { IsActive } from "@/constants/constants";
import { setLtPropertiesForm } from "./redux";
import { LtPropertiesForm, modelLtProperties } from "./redux/model";
import {
	addLtProperties,
	initGetLtPropertiesDetail,
	updateLtProperties,
} from "./service";
import {
	descriptionName,
	groupNameName,
	ltPropertiesRules,
	propertyCodeName,
	propertyTextName,
	sortingOrderName,
} from "./field-validation/ltPropertiesForm";
// import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
// import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
dayjs.extend(weekday);
dayjs.extend(localeData);

const Form = (params: LtPropertiesFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.ltProperties.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetLtPropertiesDetail(params));
				} else {
					dispatch(setLtPropertiesForm(modelLtProperties.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<LtPropertiesForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<LtPropertiesForm>["onFinishFailed"] = (
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
						dispatch(updateLtProperties(form, router));
					} else {
						dispatch(addLtProperties(form, router));
					}
				}}
				cancelFunction={() => {
					dispatch(setIsOpenDialog(false));
				}}
				closeFunction={() => {
					dispatch(setIsOpenDialog(false));
				}}
			/>

			{isInit && (
				<MasterDataFormLayout
					disabled={_.isEmpty(write)}
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					textHeader="100120-ส่วนงานสิทธิประโยชน์"
					initialValues={{
						...form,
						// endEffectiveDate: dayjs(form.endEffectiveDate, DateFormat.YYYYMMDD),
						// startEffectiveDate: dayjs(
						// 	form.startEffectiveDate,
						// 	DateFormat.YYYYMMDD
						// ),
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setLtPropertiesForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.LT_PROPERTIES.link);
					}}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={groupNameName}
									itemName="groupName"
									rules={ltPropertiesRules.groupNameSchema}
									value={form.groupName}
									onChangeFunction={(e) => {
										dispatch(
											setLtPropertiesForm({
												...form,
												groupName: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={propertyCodeName}
									itemName="propertyCode"
									rules={ltPropertiesRules.propertyCodeSchema}
									value={form.propertyCode}
									onChangeFunction={(e) => {
										dispatch(
											setLtPropertiesForm({
												...form,
												propertyCode: e.target.value,
											})
										);
									}}
								/>

								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={sortingOrderName}
									itemName="sortingOrder"
									rules={ltPropertiesRules.sortingOrderSchema}
									value={form.sortingOrder}
									onChangeFunction={(e) => {
										dispatch(
											setLtPropertiesForm({
												...form,
												sortingOrder: parseInt(e.target.value),
											})
										);
									}}
								/>
							</div>

							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									disabled={_.isEmpty(write)}
									label={propertyTextName}
									itemName="propertyText"
									rules={ltPropertiesRules.propertyTextSchema}
									value={form.propertyText}
									onChangeFunction={(e) => {
										dispatch(
											setLtPropertiesForm({
												...form,
												propertyText: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									disabled={_.isEmpty(write)}
									label={descriptionName}
									itemName="description"
									rules={ltPropertiesRules.descriptionSchema}
									value={form.description}
									onChangeFunction={(e) => {
										dispatch(
											setLtPropertiesForm({
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
