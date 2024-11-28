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
	HospitalAnnouncedPriceFileCategoryDetailForm,
	modelHospitalAnnouncedPriceFileCategoryDetail,
} from "./redux/model";
import { hospitalAnnouncedPriceFileCategoryDetailRules } from "./field-validation/courseCategoryForm";
import {
	addHospitalAnnouncedPriceFileCategoryDetail,
	initGetHospitalAnnouncedPriceFileCategoryDetailDetail,
	updateHospitalAnnouncedPriceFileCategoryDetail,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { hospitalAnnouncedPriceFileCategoryDetailName } from "./interfaces/name";
import { setHospitalAnnouncedPriceFileCategoryDetailForm } from "../redux";

const Form = (
	params: HospitalAnnouncedPriceFileCategoryDetailFormPageProps
) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.hospital.hospitalAnnouncedPriceFileCategoryDetail.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(
						initGetHospitalAnnouncedPriceFileCategoryDetailDetail(params)
					);
				} else {
					dispatch(
						setHospitalAnnouncedPriceFileCategoryDetailForm(
							modelHospitalAnnouncedPriceFileCategoryDetail.form
						)
					);
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalAnnouncedPriceFileCategoryDetailForm>["onFinish"] =
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
							updateHospitalAnnouncedPriceFileCategoryDetail(form, router)
						);
					} else {
						dispatch(addHospitalAnnouncedPriceFileCategoryDetail(form, router));
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
					// 		setHospitalAnnouncedPriceFileCategoryDetailForm({
					// 			...form,
					// 			...e,
					// 		})
					// 	);
					// }}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setHospitalAnnouncedPriceFileCategoryDetailForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(
							LINKS.HOSPITAL.hospitalAnnouncedPriceFileCategoryDetail.list
						);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={
										hospitalAnnouncedPriceFileCategoryDetailName.categoryCode
									}
									itemName="categoryCode"
									rules={
										hospitalAnnouncedPriceFileCategoryDetailRules.categoryCodeSchema
									}
									value={form.categoryCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileCategoryDetailForm({
												...form,
												categoryCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={
										hospitalAnnouncedPriceFileCategoryDetailName.categoryName
									}
									itemName="categoryName"
									rules={
										hospitalAnnouncedPriceFileCategoryDetailRules.categoryNameSchema
									}
									value={form.categoryName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceFileCategoryDetailForm({
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
