"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { handleDoctorFormSubmit, initGetDoctorForm } from "../service";
import { useParams, useRouter } from "next/navigation";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { getBaseItemsForm, getExtendedItemsForm } from "./Detail/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { SliceModel } from "@/redux/slices/model";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { handleSession } from "@/components/MedDropDown/service";
import { setDoctorForm } from "../redux";
import { modelDoctorForm } from "../redux/form/model";
import { HandleWhiteBarLayout } from "./service";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

const DoctorFormTabs = () => {
	const { uuid } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	// const uuid = new URLSearchParams(window.location.search).get("uuid");

	const { dispatchLayout } = useLayout();
	const { doctorForm, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			doctorForm: state.doctor.doctorForm,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
		}),
		shallowEqual
	);

	const [tmpCourseCategory, setTmpCourseCategory] = useState(
		doctorForm.doctorData.courseCategory
	);
	useEffect(() => {
		if (uuid) dispatch(initGetDoctorForm(`${uuid}`));
		else dispatch(setDoctorForm(modelDoctorForm));
	}, [uuid]);

	useEffect(() => {
		dispatch(handleSession(SESSION_NAME.JOB_TYPE));
		dispatch(handleSession(SESSION_NAME.ADDRESS));
		dispatch(handleSession(SESSION_NAME.HOSPITAL));
		dispatch(handleSession(SESSION_NAME.BANK));
		dispatch(handleSession(SESSION_NAME.BANK_BRANCH));
		dispatchLayout({ type: "setDisplayScrollButton", payload: true });
	}, []);

	useEffect(() => {
		if (
			!_.isEmpty(doctorForm.doctorData.courseCategory) &&
			_.isEmpty(tmpCourseCategory)
		) {
			setTmpCourseCategory(doctorForm.doctorData.courseCategory);
		}
	}, [doctorForm.doctorData.courseCategory]);

	const [form] = Form.useForm();
	const onFinish: FormProps["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const BaseItemsForm = getBaseItemsForm({ form, onFinish });

	if (doctorForm.doctorData.courseCategory !== "E") {
		const ExtendedItemsForm = getExtendedItemsForm();
		BaseItemsForm.push(...ExtendedItemsForm);
	}

	return (
		<BaseColumn className="p-2 w-full h-full space-y-6">
			{HandleWhiteBarLayout(doctorForm, dispatch, tmpCourseCategory ?? "")}
			<BaseColumn className="bg-white p-2 h-full rounded-2xl">
				<BaseConfirmDialog
					isOpen={isOpenBaseConfirmDialog}
					bodyDescriptionText="คุณต้องการบันทึก / แก้ไข ข้อมูลแพทย์ใช่หรือไม่"
					confirmFunction={() => {
						dispatch(
							handleDoctorFormSubmit(doctorForm, uuid as string, router)
						);
					}}
					cancelFunction={() => {
						dispatch(setIsOpenBaseConfirmDialog(false));
					}}
					closeFunction={() => {
						dispatch(setIsOpenBaseConfirmDialog(false));
					}}
				/>
				{BaseItemsForm?.map((item, index: number) => (
					<BaseCollapse
						key={item.key}
						defaultActiveKey={index + 1}
						items={[item]}
					/>
				))}
				<div className="py-2 space-x-6 w-full flex justify-center">
					<BaseButton
						size="small"
						htmlType="submit"
						type="cancel"
						label="ยกเลิก"
						onClick={() => form.submit()}
					/>
					<BaseButton
						// pageLevel="edit"
						disabled={doctorForm.doctorData.isELearning}
						size="small"
						htmlType="submit"
						label="บันทึก"
						iconType="save"
						onClick={() => form.submit()}
					/>
				</div>
			</BaseColumn>
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
