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
import { itemsTables } from "./Detail/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog, setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { SliceModel } from "@/redux/slices/model";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { handleSession } from "@/components/MedDropDown/service";
import { setDoctorForm } from "../redux";
import { modelDoctorForm } from "../redux/form/model";
import { handleOpenHistory } from "./service";

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
		dispatch(handleSession(SESSION_NAME.ADDRESS));
		dispatch(handleSession(SESSION_NAME.HOSPITAL));
	}, []);

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
				<BaseButton
					label="History Test"
					onClick={() => {
						dispatch(handleOpenHistory(doctorForm));
					}}
				/>
			)}
			{itemsTables?.map((item, index: number) => (
				<BaseCollapse
					key={item.key}
					defaultActiveKey={index + 1}
					items={[item]}
				/>
			))}
			<div className="py-2 w-full flex justify-end">
				<BaseButton
					size="large"
					className="w-1/6 border-4 border-black text-black bg-[#f3da5f] drop-shadow-2xl"
					label="บันทึก"
					onClick={() => dispatch(setIsOpenBaseConfirmDialog(true))}
				/>
			</div>
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
