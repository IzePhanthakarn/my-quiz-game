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
import {
	HospitalAnnouncedPriceDetailMasterForm,
	modelHospitalAnnouncedPriceDetailMaster,
} from "./redux/model";
import { hospitalAnnouncedPriceDetailMasterRules } from "./field-validation/courseCategoryForm";
import {
	addHospitalAnnouncedPriceDetailMaster,
	initGetHospitalAnnouncedPriceDetailMasterDetail,
	updateHospitalAnnouncedPriceDetailMaster,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { hospitalAnnouncedPriceDetailMasterName } from "./interfaces/name";
import { setHospitalAnnouncedPriceDetailMasterForm } from "../redux";
import MedDropDown from "@/components/MedDropDown";
import {
	DROPDOWN_ISACTIVE,
	SESSION_NAME,
} from "@/components/MedDropDown/model";

const Form = (params: HospitalAnnouncedPriceDetailMasterFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.hospital.hospitalAnnouncedPriceDetailMaster.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(
						initGetHospitalAnnouncedPriceDetailMasterDetail(params)
					);
				} else {
					dispatch(
						setHospitalAnnouncedPriceDetailMasterForm(
							modelHospitalAnnouncedPriceDetailMaster.form
						)
					);
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalAnnouncedPriceDetailMasterForm>["onFinish"] =
		() => {
			dispatch(setIsOpenBaseConfirmDialog(true));
		};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateHospitalAnnouncedPriceDetailMaster(form, router));
					} else {
						dispatch(addHospitalAnnouncedPriceDetailMaster(form, router));
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
					textHeader="ใบรับรองหลักสูตร"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={form}
					onFinish={onFinish}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					// onValuesChange={(e) => {
					// 	dispatch(
					// 		setHospitalAnnouncedPriceDetailMasterForm({
					// 			...form,
					// 			...e,
					// 		})
					// 	);
					// }}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setHospitalAnnouncedPriceDetailMasterForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceDetailMaster.list);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={hospitalAnnouncedPriceDetailMasterName.name}
									itemName="name"
									rules={hospitalAnnouncedPriceDetailMasterRules.nameSchema}
									value={form.name}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterForm({
												...form,
												name: e.target.value,
											})
										);
									}}
								/>

								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={hospitalAnnouncedPriceDetailMasterName.unitName}
									itemName="unitName"
									rules={hospitalAnnouncedPriceDetailMasterRules.unitNameSchema}
									value={form.unitName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterForm({
												...form,
												unitName: e.target.value,
											})
										);
									}}
								/>

								{!_.isEmpty(params.params.uuid) && (
									<BaseItemInput
										pageLevel={params.params.uuid ? "edit" : "add"}
										label={hospitalAnnouncedPriceDetailMasterName.runningCode}
										itemName="runningCode"
										rules={
											hospitalAnnouncedPriceDetailMasterRules.runningCodeSchema
										}
										value={form.runningCode}
										onChangeFunction={(e) => {
											dispatch(
												setHospitalAnnouncedPriceDetailMasterForm({
													...form,
													runningCode: e.target.value,
												})
											);
										}}
									/>
								)}
								<MedDropDown
									label={
										hospitalAnnouncedPriceDetailMasterName.hospitalAnnouncedPriceDetailCategoryMasterUuid
									}
									type={
										SESSION_NAME.HOSPITAL_ANNOUNCED_PRICE_DETAIL_CATEGORY_MASTER
									}
									rules={
										hospitalAnnouncedPriceDetailMasterRules.hospitalAnnouncedPriceDetailCategoryMasterUuidSchema
									}
									value={form.hospitalAnnouncedPriceDetailCategoryMasterUuid}
									itemName="hospitalAnnouncedPriceDetailCategoryMasterUuid"
									getValue={(value) => {
										console.log("🚀 ~ Form ~ value:", value);
										dispatch(
											setHospitalAnnouncedPriceDetailMasterForm({
												...form,
												hospitalAnnouncedPriceDetailCategoryMasterUuid: value,
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
