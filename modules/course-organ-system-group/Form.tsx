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
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { courseOrganSystemGroupName } from "./interfaces/name";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";

const Form = (params: CourseOrganSystemGroupFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
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
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateCourseOrganSystemGroup(form, router));
					} else {
						dispatch(addCourseOrganSystemGroup(form, router));
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
					textHeader="หมวดหมู่อวัยวะ"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
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
					disabledHistoryButton
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
					pageLevel={params.params.uuid ? "edit" : "add"}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								pageLevel={params.params.uuid ? "edit" : "add"}
								label={courseOrganSystemGroupName.courseCategory}
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
								pageLevel={params.params.uuid ? "edit" : "add"}
								label={courseOrganSystemGroupName.organSystemGroup}
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
								pageLevel={params.params.uuid ? "edit" : "add"}
								label={courseOrganSystemGroupName.organSystemNo}
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
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
