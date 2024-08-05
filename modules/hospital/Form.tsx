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
import { setHospitalForm } from "./redux";
import { HospitalForm, modelHospital } from "./redux/model";
import { addHospital, initGetHospitalDetail, updateHospital } from "./service";
import { names, rules } from "./field-validation/FormValidation";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import {
	updateMedicalAmount,
	addMedicalAmount,
} from "../medical-amount/service";
dayjs.extend(weekday);
dayjs.extend(localeData);

const Form = (params: HospitalFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { isOpen, form, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			form: state.hospital.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetHospitalDetail(params));
				} else {
					dispatch(setHospitalForm(modelHospital.form));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<HospitalForm>["onFinish"] = (values) => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	const onFinishFailed: FormProps<HospitalForm>["onFinishFailed"] = (_) => {};

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
					router.push(LINKS.HOSPITAL.link);
				}}
			/>

			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(updateHospital(form));
					} else {
						dispatch(addHospital(form));
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
					disabled={_.isEmpty(write)}
					initialValues={{
						...form,
						contractStartDate: !_.isEmpty(form.contractStartDate)
							? dayjs(form.contractStartDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.contractStartDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						contractEndDate: !_.isEmpty(form.contractEndDate)
							? dayjs(form.contractEndDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.contractEndDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						sp7StartDate: !_.isEmpty(form.sp7StartDate)
							? dayjs(form.sp7StartDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.sp7StartDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						sp7EndDate: !_.isEmpty(form.sp7EndDate)
							? dayjs(form.sp7EndDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.sp7EndDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						sp19StartDate: !_.isEmpty(form.sp19StartDate)
							? dayjs(form.sp19StartDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.sp19StartDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						sp19EndDate: !_.isEmpty(form.sp19EndDate)
							? dayjs(form.sp19EndDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.sp19EndDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						levelChangeDate: !_.isEmpty(form.levelChangeDate)
							? dayjs(form.levelChangeDate, DateFormat.YYYYMMDD).isValid()
								? dayjs(form.levelChangeDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						hospitalChangeNameDate: !_.isEmpty(form.hospitalChangeNameDate)
							? dayjs(
									form.hospitalChangeNameDate,
									DateFormat.YYYYMMDD
							  ).isValid()
								? dayjs(form.hospitalChangeNameDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
						hospitalListBoiStartDate: !_.isEmpty(form.hospitalListBoiStartDate)
							? dayjs(
									form.hospitalListBoiStartDate,
									DateFormat.YYYYMMDD
							  ).isValid()
								? dayjs(form.hospitalListBoiStartDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,

						hospitalListBoiExpireDate: !_.isEmpty(
							form.hospitalListBoiExpireDate
						)
							? dayjs(
									form.hospitalListBoiExpireDate,
									DateFormat.YYYYMMDD
							  ).isValid()
								? dayjs(form.hospitalListBoiExpireDate, DateFormat.YYYYMMDD)
								: undefined
							: undefined,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(form.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setHospitalForm({
								...form,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.HOSPITAL.link);
					}}
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					inputs={
						<>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalWcfCode}
									itemName="hospitalWcfCode"
									rules={rules.hospitalWcfCodeSchema}
									value={form.hospitalWcfCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalWcfCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalDbmsCode}
									itemName="hospitalDbmsCode"
									rules={rules.hospitalDbmsCodeSchema}
									value={form.hospitalDbmsCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalDbmsCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalMinistryCode}
									itemName="hospitalMinistryCode"
									rules={rules.hospitalMinistryCodeSchema}
									value={form.hospitalMinistryCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalMinistryCode: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalName}
									itemName="hospitalName"
									rules={rules.hospitalNameSchema}
									value={form.hospitalName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalName: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.oldHospitalName}
									itemName="oldHospitalName"
									rules={rules.oldHospitalNameSchema}
									value={form.oldHospitalName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												oldHospitalName: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.address}
									itemName="address"
									rules={rules.addressSchema}
									value={form.address}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												address: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.amphurCode}
									itemName="amphurCode"
									rules={rules.amphurCodeSchema}
									value={form.amphurCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												amphurCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.provinceCode}
									itemName="provinceCode"
									rules={rules.provinceCodeSchema}
									value={form.provinceCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												provinceCode: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.postalCode}
									itemName="postalCode"
									rules={rules.postalCodeSchema}
									value={form.postalCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												postalCode: e.target.value,
											})
										);
									}}
								/>
							</div>
							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								{" "}
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.telephoneNumber}
									itemName="telephoneNumber"
									rules={rules.telephoneNumberSchema}
									value={form.telephoneNumber}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												telephoneNumber: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.faxNumber}
									itemName="faxNumber"
									rules={rules.faxNumberSchema}
									value={form.faxNumber}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												faxNumber: e.target.value,
											})
										);
									}}
								/>
							</div>

							<div className="grid gap-x-4 gap-y-2 grid-cols-4">
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.belongTo}
									itemName="belongTo"
									rules={rules.belongToSchema}
									value={form.belongTo}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												belongTo: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.numberOfBed}
									itemName="numberOfBed"
									rules={rules.numberOfBedSchema}
									value={form.numberOfBed}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												numberOfBed: parseInt(e.target.value),
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.bps}
									itemName="bps"
									rules={rules.bpsSchema}
									value={form.bps}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												bps: parseInt(e.target.value),
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalType}
									itemName="hospitalType"
									rules={rules.hospitalTypeSchema}
									value={form.hospitalType}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalType: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalCategory}
									itemName="hospitalCategory"
									rules={rules.hospitalCategorySchema}
									value={form.hospitalCategory}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalCategory: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.companyName}
									itemName="companyName"
									rules={rules.companyNameSchema}
									value={form.companyName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												companyName: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.revenueRegistrationCode}
									itemName="revenueRegistrationCode"
									rules={rules.revenueRegistrationCodeSchema}
									value={form.revenueRegistrationCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												revenueRegistrationCode: e.target.value,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.contractStartDate}
									itemName="contractStartDate"
									rules={rules.contractStartDateSchema}
									value={form.contractStartDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												contractStartDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.contractEndDate}
									itemName="contractEndDate"
									rules={rules.contractEndDateSchema}
									value={form.contractEndDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												contractEndDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp7StartDate}
									itemName="sp7StartDate"
									rules={rules.sp7StartDateSchema}
									value={form.sp7StartDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												sp7StartDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp7EndDate}
									itemName="sp7EndDate"
									rules={rules.sp7EndDateSchema}
									value={form.sp7EndDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												sp7EndDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp19StartDate}
									itemName="sp19StartDate"
									rules={rules.sp19StartDateSchema}
									value={form.sp19StartDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												sp19StartDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.sp19EndDate}
									itemName="sp19EndDate"
									rules={rules.sp19EndDateSchema}
									value={form.sp19EndDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												sp19EndDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.levelChangeDate}
									itemName="levelChangeDate"
									rules={rules.levelChangeDateSchema}
									value={form.levelChangeDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												levelChangeDate: e,
											})
										);
									}}
								/>

								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.ssoPartner}
									itemName="ssoPartner"
									rules={rules.ssoPartnerSchema}
									value={form.ssoPartner}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												ssoPartner: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.tempColumn2}
									itemName="tempColumn2"
									rules={rules.tempColumn2Schema}
									value={form.tempColumn2}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												tempColumn2: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.tempColumn3}
									itemName="tempColumn3"
									rules={rules.tempColumn3Schema}
									value={form.tempColumn3}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												tempColumn3: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.tempColumn4}
									itemName="tempColumn4"
									rules={rules.tempColumn4Schema}
									value={form.tempColumn4}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												tempColumn4: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.tempColumn5}
									itemName="tempColumn5"
									rules={rules.tempColumn5Schema}
									value={form.tempColumn5}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												tempColumn5: e.target.value,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.hospitalChangeNameDate}
									itemName="hospitalChangeNameDate"
									rules={rules.hospitalChangeNameDateSchema}
									value={form.hospitalChangeNameDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalChangeNameDate: e,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.hospitalListBoi}
									itemName="hospitalListBoi"
									rules={rules.hospitalListBoiSchema}
									value={form.hospitalListBoi}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalListBoi: e.target.value,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.hospitalListBoiStartDate}
									itemName="hospitalListBoiStartDate"
									rules={rules.hospitalListBoiStartDateSchema}
									value={form.hospitalListBoiStartDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalListBoiStartDate: e,
											})
										);
									}}
								/>
								<BaseDatePicker
									label={names.hospitalListBoiExpireDate}
									itemName="hospitalListBoiExpireDate"
									rules={rules.hospitalListBoiExpireDateSchema}
									value={form.hospitalListBoiExpireDate}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												hospitalListBoiExpireDate: e,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.tambolCode}
									itemName="tambolCode"
									rules={rules.tambolCodeSchema}
									value={form.tambolCode}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												tambolCode: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.remarkChangeName}
									itemName="remarkChangeName"
									rules={rules.remarkChangeNameSchema}
									value={form.remarkChangeName}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												remarkChangeName: e.target.value,
											})
										);
									}}
								/>
								<BaseItemInput
									disabled={_.isEmpty(write)}
									label={names.ssoProject}
									itemName="ssoProject"
									rules={rules.ssoProjectSchema}
									value={form.ssoProject}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalForm({
												...form,
												ssoProject: e.target.value,
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
