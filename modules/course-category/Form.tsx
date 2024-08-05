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
import { setCourseCategoryForm } from "./redux";
import { CourseCategoryForm, modelCourseCategory } from "./redux/model";
import { courseCategoryRules } from "./field-validation/courseCategoryForm";
import {
	addCourseCategory,
	initGetCourseCategoryDetail,
	updateCourseCategory,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";

const Form = (params: CourseCategoryFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.courseCategory.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetCourseCategoryDetail(params));
				} else {
					dispatch(setCourseCategoryForm(modelCourseCategory.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<CourseCategoryForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<CourseCategoryForm>["onFinishFailed"] = (
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
					router.push(LINKS.CATEGORY_COURSE.link);
				}}
			/>

			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateCourseCategory(form));
					} else {
						dispatch(addCourseCategory(form));
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
					textHeader="100120-ส่วนงานสิทธิประโยชน์"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					disabled={_.isEmpty(write)}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setCourseCategoryForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.CATEGORY_COURSE.link);
					}}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Category Description"
								itemName="categoryDescription"
								rules={courseCategoryRules.categoryDescriptionSchema}
								value={form.categoryDescription}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											categoryDescription: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Category SubDesc"
								itemName="categorySubDesc"
								rules={courseCategoryRules.categorySubDescSchema}
								value={form.categorySubDesc}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											categorySubDesc: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="CourseCategory Category"
								itemName="courseCategory"
								rules={courseCategoryRules.courseCategorySchema}
								value={form.courseCategory}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											courseCategory: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Format Code"
								itemName="formatCode"
								rules={courseCategoryRules.formatCodeSchema}
								value={form.formatCode}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											formatCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organize Group Code"
								itemName="organizeGroupCode"
								rules={courseCategoryRules.organizeGroupCodeSchema}
								value={form.organizeGroupCode}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											organizeGroupCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organize Sub Group Code"
								itemName="organizeSubGroupCode"
								rules={courseCategoryRules.organizeSubGroupCodeSchema}
								value={form.organizeSubGroupCode}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											organizeSubGroupCode: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Situation"
								itemName="situation"
								rules={courseCategoryRules.situationSchema}
								value={form.situation}
								onChangeFunction={(e) => {
									dispatch(
										setCourseCategoryForm({
											...form,
											situation: e.target.value,
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
