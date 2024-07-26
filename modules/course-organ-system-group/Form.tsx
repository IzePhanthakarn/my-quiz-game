"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { IsActive } from "@/constants/constants";
import { setCourseOrganSystemGroupForm } from "./redux";
import {
	CourseOrganSystemGroupForm,
	modelCourseOrganSystemGroup,
} from "./redux/model";
import { courseOrganSystemGroupRules } from "./field-validation/courseOrganSystemGroupForm";
import {
	addCourseOrganSystemGroup,
	initGetCourseOrganSystemGroupDetail,
	updateCourseOrganSystemGroup,
} from "./service";

const Form = (params: CourseOrganSystemGroupFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			form: state.courseOrganSystemGroup.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetCourseOrganSystemGroupDetail(params));
				} else {
					dispatch(
						setCourseOrganSystemGroupForm(modelCourseOrganSystemGroup.form)
					);
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<CourseOrganSystemGroupForm>["onFinish"] = (
		_values
	) => {
		if (!_.isEmpty(params.params.uuid)) {
			dispatch(updateCourseOrganSystemGroup(form));
		} else {
			dispatch(addCourseOrganSystemGroup(form));
		}
	};

	const onFinishFailed: FormProps<CourseOrganSystemGroupForm>["onFinishFailed"] =
		(_) => {};

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
					router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.link);
				}}
			/>

			{isInit && (
				<MasterDataForm
					disabled={_.isEmpty(write)}
					initialValues={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setCourseOrganSystemGroupForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.link);
					}}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Course Category"
								itemName="courseCategory"
								rules={courseOrganSystemGroupRules.courseCategorySchema}
								value={form.courseCategory}
								onChangeFunction={(e) => {
									dispatch(
										setCourseOrganSystemGroupForm({
											...form,
											courseCategory: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Organ System Group"
								itemName="organSystemGroup"
								rules={courseOrganSystemGroupRules.organSystemGroupSchema}
								value={form.organSystemGroup}
								onChangeFunction={(e) => {
									dispatch(
										setCourseOrganSystemGroupForm({
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
								rules={courseOrganSystemGroupRules.organSystemNoSchema}
								value={form.organSystemNo}
								onChangeFunction={(e) => {
									dispatch(
										setCourseOrganSystemGroupForm({
											...form,
											organSystemNo: e.target.value,
										})
									);
								}}
							/>
						</div>
					}
				/>
			)}
		</div>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
