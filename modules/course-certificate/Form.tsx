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
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { IsActive } from "@/constants/constants";
import { setCourseCertificateForm } from "./redux";
import { CourseCertificateForm, modelCourseCertificate } from "./redux/model";
import { courseCertificateRules } from "./field-validation/courseCategoryForm";
import {
	addCourseCertificate,
	initGetCourseCertificateDetail,
	updateCourseCertificate,
} from "./service";

const Form = (params: CourseCertificateFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			form: state.courseCertificate.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetCourseCertificateDetail(params));
				} else {
					dispatch(setCourseCertificateForm(modelCourseCertificate.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<CourseCertificateForm>["onFinish"] = (values) => {
		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateCourseCertificate(form));
		} else {
			dispatch(addCourseCertificate(form));
		}
	};

	const onFinishFailed: FormProps<CourseCertificateForm>["onFinishFailed"] = (
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
			<BaseDialog
				isOpen={isOpen}
				content={<>ระบบบันทึกข้อมูลใหม่สำเร็จแล้ว</>}
				baseDialogType={BaseDialogType.SUCCESS}
				headerText={<>บันทึกข้อมูลสำเร็จ</>}
				setIsOpen={(value) => {
					dispatch(setIsOpenDialog(value));
					router.push(LINKS.CATEGORY_CERTIFICATE.link);
				}}
			/>

			{isInit && (
				<MasterDataFormLayout
					textHeader="100120-ส่วนงานสิทธิประโยชน์"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					disabled={_.isEmpty(write)}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setCourseCertificateForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.CATEGORY_CERTIFICATE.link);
					}}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Course Category"
								itemName="courseCategory"
								rules={courseCertificateRules.courseCategorySchema}
								value={form.courseCategory}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											courseCategory: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Sso Course Code"
								itemName="ssoCourseCode"
								rules={courseCertificateRules.ssoCourseCodeSchema}
								value={form.ssoCourseCode}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											ssoCourseCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Course Description"
								itemName="courseDescription"
								rules={courseCertificateRules.courseDescriptionSchema}
								value={form.courseDescription}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											courseDescription: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Course Year"
								itemName="courseYear"
								rules={courseCertificateRules.courseYearSchema}
								value={form.courseYear}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											courseYear: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organize Code"
								itemName="organizeCode"
								rules={courseCertificateRules.organizeCodeSchema}
								value={form.organizeCode}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											organizeCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Gen No"
								itemName="genNo"
								rules={courseCertificateRules.genNoSchema}
								value={form.genNo}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											genNo: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organ System Group"
								itemName="organSystemGroup"
								rules={courseCertificateRules.organSystemGroupSchema}
								value={form.organSystemGroup}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											organSystemGroup: e.target.value,
										})
									);
								}}
							/>

							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organ System No"
								itemName="organSystemNo"
								rules={courseCertificateRules.organSystemNoSchema}
								value={form.organSystemNo}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											organSystemNo: e.target.value,
										})
									);
								}}
							/>

							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Order No"
								itemName="orderNo"
								rules={courseCertificateRules.orderNoSchema}
								value={form.orderNo}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											orderNo: e.target.value,
										})
									);
								}}
							/>

							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Receiver Phone Number"
								itemName="receiverPhoneNumber"
								rules={courseCertificateRules.receiverPhoneNumberSchema}
								value={form.receiverPhoneNumber}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											receiverPhoneNumber: e.target.value,
										})
									);
								}}
							/>

							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Receiver Address"
								itemName="receiverAddress"
								rules={courseCertificateRules.receiverAddressSchema}
								value={form.receiverAddress}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCertificateForm({
											...form,
											receiverAddress: e.target.value,
										})
									);
								}}
							/>
						</div>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
