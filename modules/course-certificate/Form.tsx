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
import { setCourseCertificateForm } from "./redux";
import { CourseCertificateForm, modelCourseCertificate } from "./redux/model";
import { courseCertificateRules } from "./field-validation/courseCategoryForm";
import {
	addCourseCertificate,
	initGetCourseCertificateDetail,
	updateCourseCertificate,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import { courseCertificateName } from "./interfaces/name";

const Form = (params: CourseCertificateFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
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

	const onFinish: FormProps<CourseCertificateForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateCourseCertificate(form, router));
					} else {
						dispatch(addCourseCertificate(form, router));
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
					disabledHistoryButton
					onChangeSwitchFunction={(e) => {
						dispatch(
							setCourseCertificateForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.COURSE_CERTIFICATE.link);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.courseCategory}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.ssoCourseCode}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.courseYear}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.organizeCode}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.genNo}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.organSystemGroup}
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
								{/* <BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.organSystemNo}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.orderNo}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.receiverPhoneNumber}
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
								/> */}
							</div>

							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.courseDescription}
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
							</div>

							{/* <div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCertificateName.receiverAddress}
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
							</div> */}
						</>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
