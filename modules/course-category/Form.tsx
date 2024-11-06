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
import { setCourseCategoryForm } from "./redux";
import { CourseCategoryForm, modelCourseCategory } from "./redux/model";
import { courseCategoryRules } from "./field-validation/courseCategoryForm";
import {
	addCourseCategory,
	initGetCourseCategoryDetail,
	updateCourseCategory,
} from "./service";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import { courseCategoryName } from "./interfaces/name";

const Form = (params: CourseCategoryFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
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

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateCourseCategory(form, router));
					} else {
						dispatch(addCourseCategory(form, router));
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
					textHeader="คอร์สอบรม"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={form}
					onFinish={onFinish}
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
						router.push(LINKS.COURSE_CATEGORY.link);
					}}
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.courseCategory}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.organizeGroupCode}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.organizeSubGroupCode}
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
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.situation}
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
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.categoryDescription}
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
							</div>

							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.categorySubDesc}
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
							</div>
							<div className="grid gap-x-7 gap-y-2 grid-cols-1">
								<BaseItemTextArea
									pageLevel={params.params.uuid ? "edit" : "add"}
									label={courseCategoryName.formatCode}
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
							</div>
						</>
					}
				/>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
