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
import {
	setIsOpenBaseConfirmDialog,
	setIsOpenDialog,
} from "@/redux/slices/dialog";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setLtPropertiesForm } from "./redux";
import { LtPropertiesForm, modelLtProperties } from "./redux/model";
import {
	addLtProperties,
	initGetLtPropertiesDetail,
	updateLtProperties,
} from "./service";
import { ltPropertiesRules } from "./field-validation/ltPropertiesForm";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import { ltPropertiesName } from "./interfaces/name";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
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
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					disabledHistoryButton
					textHeader="Lt-Properties"
					initialValues={{
						...form,
						updatedDate: dayjs(form.updatedDate).format(
							DateFormat.DDMMYYYYHHmmss
						),
						createdDate: dayjs(form.createdDate).format(
							DateFormat.DDMMYYYYHHmmss
						),
					}}
					onFinish={onFinish}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setLtPropertiesForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					cancelFunction={() => {
						router.push(LINKS.LT_PROPERTIES.link);
					}}
					onValuesChange={(e: LtPropertiesForm) => {
						dispatch(
							setLtPropertiesForm({ ...form, ...(e as LtPropertiesForm) })
						);
					}}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={ltPropertiesName.groupName}
									itemName="groupName"
									rules={ltPropertiesRules.groupNameSchema}
								/>
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={ltPropertiesName.propertyCode}
									itemName="propertyCode"
									rules={ltPropertiesRules.propertyCodeSchema}
								/>

								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={ltPropertiesName.sortingOrder}
									itemName="sortingOrder"
									rules={ltPropertiesRules.sortingOrderSchema}
								/>
							</div>

							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={ltPropertiesName.propertyText}
									itemName="propertyText"
									rules={ltPropertiesRules.propertyTextSchema}
								/>
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={ltPropertiesName.description}
									itemName="description"
									rules={ltPropertiesRules.descriptionSchema}
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
