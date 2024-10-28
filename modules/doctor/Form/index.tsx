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
import { handleOpenHistory, handleOpenHistoryAll } from "./service";
import { BaseSubmitButton } from "wcf-component-lib/src/components";
import ClockCircleOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ClockCircleOutlined";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";

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
	}, []);

	const [form] = Form.useForm();
	const onFinish: FormProps["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	return (
		<BaseColumn className="bg-white p-2 h-full">
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				bodyDescriptionText="คุณต้องการบันทึก / แก้ไข ข้อมูลแพทย์ใช่หรือไม่"
				confirmFunction={() => {
					dispatch(handleDoctorFormSubmit(doctorForm, uuid as string, router));
				}}
				cancelFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
				closeFunction={() => {
					dispatch(setIsOpenBaseConfirmDialog(false));
				}}
			/>

			{doctorForm.editTimes.length > 1 && (
				<div className="flex justify-end py-2">
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
				</div>
			)}
			{getItemsForm({ form, onFinish })?.map((item, index: number) => (
				<BaseCollapse
					key={item.key}
					defaultActiveKey={index + 1}
					items={[item]}
				/>
			))}
			<div className="py-2 w-full flex justify-end">
				<BaseButton
					size="large"
					htmlType="submit"
					className="w-1/6 border-4 border-black text-black bg-[#f3da5f] drop-shadow-2xl"
					label="บันทึก"
					onClick={() => form.submit()}
				/>
			</div>
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
