"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import dayjs from "dayjs";
import { DateFormat } from "@/constants/date-format.constant";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { FormItemInput } from "wcf-component-lib/src/components/FormItemInput";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenDialog } from "@/redux/slices/dialog";
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

const Form = (params: CourseCategoryFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
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
					await dispatch(setCourseCategoryForm(modelCourseCategory.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<CourseCategoryForm>["onFinish"] = (values) => {
		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateCourseCategory(form));
		} else {
			dispatch(addCourseCategory(form));
		}
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
		<div className="w-full flex flex-col relative py-3 px-3 bg-white">
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

			{isInit && (
				<MasterDataForm
					disabled={_.isEmpty(write) ? true : false}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y ? true : false}
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
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
								<FormItemInput
									disabled={_.isEmpty(write) ? true : false}
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
						</>
					}
				/>
			)}
		</div>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
