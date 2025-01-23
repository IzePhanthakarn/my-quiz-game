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
	HospitalAnnouncedPriceDetailCategoryMasterForm,
	modelHospitalAnnouncedPriceDetailCategoryMaster,
} from "./redux/model";
import { hospitalAnnouncedPriceDetailCategoryMasterRules } from "./field-validation/courseCategoryForm";
import {
	addHospitalAnnouncedPriceDetailCategoryMaster,
	initGetHospitalAnnouncedPriceDetailCategoryMasterDetail,
	updateHospitalAnnouncedPriceDetailCategoryMaster,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { hospitalAnnouncedPriceDetailCategoryMasterName } from "./interfaces/name";
import { setHospitalAnnouncedPriceDetailCategoryMasterForm } from "../redux";

const Form = (
	params: HospitalAnnouncedPriceDetailCategoryMasterFormPageProps
) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.hospital.hospitalAnnouncedPriceDetailCategoryMaster.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(
						initGetHospitalAnnouncedPriceDetailCategoryMasterDetail(params)
					);
				} else {
					dispatch(
						setHospitalAnnouncedPriceDetailCategoryMasterForm(
							modelHospitalAnnouncedPriceDetailCategoryMaster.form
						)
					);
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalAnnouncedPriceDetailCategoryMasterForm>["onFinish"] =
		() => {
			dispatch(setIsOpenBaseConfirmDialog(true));
		};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(
							updateHospitalAnnouncedPriceDetailCategoryMaster(form, router)
						);
					} else {
						dispatch(
							addHospitalAnnouncedPriceDetailCategoryMaster(form, router)
						);
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
					textHeader="เพิ่มข้อมูลประเภทราคาประกาศ"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={form}
					onFinish={onFinish}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					disabledHistoryButton
					// onValuesChange={(e) => {
					// 	dispatch(
					// 		setHospitalAnnouncedPriceDetailCategoryMasterForm({
					// 			...form,
					// 			...e,
					// 		})
					// 	);
					// }}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setHospitalAnnouncedPriceDetailCategoryMasterForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(
							LINKS.HOSPITAL.hospitalAnnouncedPriceDetailCategoryMaster.list
						);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={
										hospitalAnnouncedPriceDetailCategoryMasterName.categoryCode
									}
									itemName="categoryCode"
									rules={
										hospitalAnnouncedPriceDetailCategoryMasterRules.categoryCodeSchema
									}
									value={form.categoryCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailCategoryMasterForm({
												...form,
												categoryCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={
										hospitalAnnouncedPriceDetailCategoryMasterName.categoryName
									}
									itemName="categoryName"
									rules={
										hospitalAnnouncedPriceDetailCategoryMasterRules.categoryNameSchema
									}
									value={form.categoryName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailCategoryMasterForm({
												...form,
												categoryName: e.target.value,
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
