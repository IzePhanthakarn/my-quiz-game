"use client";

import React, { useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { handleDoctorFormSubmit, initGetDoctorForm } from "../service";
import { useParams, useRouter } from "next/navigation";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { getItemsForm } from "./Detail/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { SliceModel } from "@/redux/slices/model";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { handleSession } from "@/components/MedDropDown/service";
import { setDoctorForm } from "../redux";
import { modelDoctorForm } from "../redux/form/model";
import { handleOpenHistoryAll } from "./service";
import { BaseSubmitButton } from "wcf-component-lib/src/components";
import ClockCircleOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ClockCircleOutlined";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import WhiteBarLayout from "wcf-component-lib/src/layout/WhiteBarLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

const DoctorFormTabs = () => {
	const { uuid } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { doctorForm, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			doctorForm: state.doctor.doctorForm,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
		}),
		shallowEqual
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
	}, []);

	const [form] = Form.useForm();
	const onFinish: FormProps["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({ type: "setDisplayScrollButton", payload: true });
	}, []);

	return (
		<BaseColumn className="p-2 h-full space-y-6">
			{doctorForm.editTimes.length > 1 && (
				<WhiteBarLayout className="justify-end items-center">
					<BaseSubmitButton
						type="default"
						className="text-base font-semibold mr-3"
						label="ประวัติการแก้ไข"
						onClickFunction={() => {
							// dispatch(handleOpenHistory(doctorForm));
							dispatch(handleOpenHistoryAll());
						}}
						icon={<ClockCircleOutlined />}
						customStyle={{
							width: "175px",
							height: "48px",
							borderRadius: "99px",
						}}
					/>
				</WhiteBarLayout>
			)}

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

				{getItemsForm({ form, onFinish })?.map((item, index: number) => (
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
