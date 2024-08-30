"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { LINKS } from "@/constants/links";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setHospitalForm } from "./redux";
import { HospitalForm, modelHospital } from "./redux/model";
import {
	addHospital,
	handleUploadHospital,
	initGetHospitalDetail,
	updateHospital,
} from "./service";
import { rules } from "./field-validation/FormValidation";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/HomeFilled";
import BaseItemTextArea from "wcf-component-lib/src/components/BaseItemTextArea/BaseItemTextArea";
import BaseCollapseLabelHeader from "wcf-component-lib/src/components/BaseCollapseLabelHeader";
import BaseButtonCancel from "wcf-component-lib/src/components/BaseButtonCancel";
import BaseButtonDraft from "wcf-component-lib/src/components/BaseButtonDraft";
import BaseButtonSave from "wcf-component-lib/src/components/BaseButtonSave";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { names } from "./interfaces/names";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import BaseHeaderNameAndSwitch from "wcf-component-lib/src/components/BaseHeaderNameAndSwitch/BaseHeaderNameAndSwitch";
import BaseUploadDraggerHospital from "wcf-component-lib/src/components/BaseUploadDraggerHospital";
import { setMultipleFiles } from "../minio/redux";
import API_PATH from "@/constants/api";
// import Cookies from "wcf-component-lib/node_modules/@types/js-cookie/index";
import Cookies from "js-cookie";

const HospitalFormPage = (params: HospitalFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const [form] = Form.useForm<HospitalForm>();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { hospitalForm, isOpenBaseConfirmDialog, files } = useSelector(
		(state: SliceModel) => ({
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
			hospitalForm: state.hospital.form,
			files: state.hospital.form.files,
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

	const onFinish: FormProps<HospitalForm>["onFinish"] = async () => {
		if (
			!_.isEmpty(form.getFieldsValue().contractEndDate) &&
			_.isEmpty(form.getFieldsValue().remarkChangeName)
		) {
			form.setFields([
				{
					name: "remarkChangeName",
					errors: [`กรุณาใส่ ${names.remarkChangeName}`],
				},
			]);
			return;
		}
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

	const firstSection: CollapseProps["items"] = [
		{
			key: "1",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดของสถานพยาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalDbmsCode}
							itemName="hospitalDbmsCode"
							rules={rules.hospitalDbmsCodeSchema}
							value={hospitalForm.hospitalDbmsCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalDbmsCode: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalWcfCode}
							itemName="hospitalWcfCode"
							rules={rules.hospitalWcfCodeSchema}
							value={hospitalForm.hospitalWcfCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalWcfCode: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalMinistryCode}
							itemName="hospitalMinistryCode"
							rules={rules.hospitalMinistryCodeSchema}
							value={hospitalForm.hospitalMinistryCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalMinistryCode: e.target.value,
									})
								);
							}}
						/>
					</div>
					<BaseHorizontalHeader
						title={"ข้อมูลพื้นฐานสถานพยาบาล"}
						icons={<HomeFilled />}
					/>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalName}
							itemName="hospitalName"
							rules={rules.hospitalNameSchema}
							value={hospitalForm.hospitalName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalName: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.companyName}
							itemName="companyName"
							rules={rules.companyNameSchema}
							value={hospitalForm.companyName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.revenueRegistrationCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										revenueRegistrationCode: e.target.value,
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
							value={hospitalForm.address}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										address: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.tambolCode}
							itemName="tambolCode"
							rules={rules.tambolCodeSchema}
							value={hospitalForm.tambolCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tambolCode: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.amphurCode}
							itemName="amphurCode"
							rules={rules.amphurCodeSchema}
							value={hospitalForm.amphurCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										amphurCode: e.target.value,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.provinceCode}
							itemName="provinceCode"
							rules={rules.provinceCodeSchema}
							value={hospitalForm.provinceCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										provinceCode: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.postalCode}
							itemName="postalCode"
							rules={rules.postalCodeSchema}
							value={hospitalForm.postalCode}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										postalCode: e.target.value,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.telephoneNumber}
							itemName="telephoneNumber"
							rules={rules.telephoneNumberSchema}
							value={hospitalForm.telephoneNumber}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.faxNumber}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										faxNumber: e.target.value,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	const secondSection: CollapseProps["items"] = [
		{
			key: "2",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลกองทุนเงินทดแทน"
					description="ข้อมูลภาพรวมและรายละเอียดกองทุนเงินทดแทนสำหรับสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.contractStartDate}
							itemName="contractStartDate"
							rules={rules.contractStartDateSchema}
							value={hospitalForm.contractStartDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										contractStartDate: e,
									})
								);
							}}
						/>
						{/* <BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalType}
							itemName="hospitalType"
							rules={rules.hospitalTypeSchema}
							value={hospitalForm.hospitalType}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalType: e.target.value,
									})
								);
							}}
						/> */}
						<BaseDropDown
							itemName={"hospitalType"}
							label={names.hospitalType}
							type="hospitalType"
							rules={rules.hospitalTypeSchema}
							getValue={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalType: e,
									})
								);
							}}
						/>
						{/* <BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalCategory}
							itemName="hospitalCategory"
							rules={rules.hospitalCategorySchema}
							value={hospitalForm.hospitalCategory}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalCategory: e.target.value,
									})
								);
							}}
						/> */}
						<BaseDropDown
							itemName={"hospitalCategory"}
							label={names.hospitalCategory}
							rules={rules.hospitalCategorySchema}
							type="hospitalCategory"
							getValue={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalCategory: e,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.sp7StartDated}
							itemName="sp7StartDated"
							rules={rules.sp7StartDatedSchema}
							value={hospitalForm.sp7StartDated}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										sp7StartDated: e,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.sp7EndDate}
							itemName="sp7EndDate"
							rules={rules.sp7EndDateSchema}
							value={hospitalForm.sp7EndDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										sp7EndDate: e,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.sp19StartDate}
							itemName="sp19StartDate"
							rules={rules.sp19StartDateSchema}
							value={hospitalForm.sp19StartDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										sp19StartDate: e,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.sp19EndDate}
							itemName="sp19EndDate"
							rules={rules.sp19EndDateSchema}
							value={hospitalForm.sp19EndDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										sp19EndDate: e,
									})
								);
							}}
						/>
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.ssoProject}
							itemName="ssoProject"
							rules={rules.ssoProjectSchema}
							value={hospitalForm.ssoProject}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										ssoProject: e.target.value,
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
							value={hospitalForm.belongTo}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.numberOfBed}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.bps}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										bps: parseInt(e.target.value),
									})
								);
							}}
						/>
					</div>

					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.levelChangeDate}
							itemName="levelChangeDate"
							rules={rules.levelChangeDateSchema}
							value={hospitalForm.levelChangeDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.ssoPartner}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.tempColumn2}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.tempColumn3}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.tempColumn4}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
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
							value={hospitalForm.tempColumn5}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										tempColumn5: e.target.value,
									})
								);
							}}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.hospitalListBoi}
							itemName="hospitalListBoi"
							rules={rules.hospitalListBoiSchema}
							value={hospitalForm.hospitalListBoi}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoi: e.target.value,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.hospitalListBoiStartDate}
							itemName="hospitalListBoiStartDate"
							rules={rules.hospitalListBoiStartDateSchema}
							value={hospitalForm.hospitalListBoiStartDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoiStartDate: e,
									})
								);
							}}
						/>
						<BaseDatePicker
							label={names.hospitalListBoiExpireDate}
							itemName="hospitalListBoiExpireDate"
							rules={rules.hospitalListBoiExpireDateSchema}
							value={hospitalForm.hospitalListBoiExpireDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalListBoiExpireDate: e,
									})
								);
							}}
						/>

						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.latitude}
							itemName="latitude"
							rules={rules.latitudeSchema}
							value={hospitalForm.latitude}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										latitude: e.target.value,
									})
								);
							}}
						/>

						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.longitude}
							itemName="longitude"
							rules={rules.longitudeSchema}
							value={hospitalForm.longitude}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										longitude: e.target.value,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	const thSection: CollapseProps["items"] = [
		{
			key: "3",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลการเปลี่ยนชื่อสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดการเปลี่ยนชื่อสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-2">
						<BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.oldHospitalName}
							itemName="oldHospitalName"
							rules={rules.oldHospitalNameSchema}
							// value={hospitalForm.oldHospitalName}
							// onChangeFunction={(e) => {
							// 	dispatch(
							// 		setHospitalForm({
							// 			...hospitalForm,
							// 			oldHospitalName: e.target.value,
							// 		})
							// 	);
							// }}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.hospitalChangeNameDate}
							itemName="hospitalChangeNameDate"
							rules={rules.hospitalChangeNameDateSchema}
							value={hospitalForm.hospitalChangeNameDate}
							onChangeDateFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										hospitalChangeNameDate: e,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	const fourthSection: CollapseProps["items"] = [
		{
			key: "4",
			label: (
				<BaseCollapseLabelHeader
					title="ข้อมูลการยกเลิกสถานพยาบาล"
					description="ข้อมูลภาพรวมและรายละเอียดการเปลี่ยนชื่อสถานพยาบาล"
				/>
			),
			children: (
				<>
					<div className="grid gap-x-4 gap-y-2 grid-cols-4">
						<BaseDatePicker
							label={names.contractEndDate}
							itemName="contractEndDate"
							rules={rules.contractEndDateSchema}
							// value={hospitalForm.contractEndDate}
							disabled={
								!_.isEmpty(params.params.uuid) &&
								!_.isEmpty(hospitalForm.contractEndDate)
									? true
									: false
							}
							// onChangeDateFunction={(e) => {
							// 	dispatch(
							// 		setHospitalForm({
							// 			...hospitalForm,
							// 			contractEndDate: e,
							// 		})
							// 	);
							// }}
						/>
					</div>
					<div className="grid gap-x-4 gap-y-2 grid-cols-2">
						<BaseItemTextArea
							// <BaseItemInput
							disabled={_.isEmpty(write)}
							label={names.remarkChangeName}
							itemName="remarkChangeName"
							rules={rules.remarkChangeNameSchema}
							value={hospitalForm.remarkChangeName}
							onChangeFunction={(e) => {
								dispatch(
									setHospitalForm({
										...hospitalForm,
										remarkChangeName: e.target.value,
									})
								);
							}}
						/>
					</div>
				</>
			),
		},
	];

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (!_.isEmpty(params.params.uuid)) {
						dispatch(
							updateHospital(
								form.getFieldsValue(),
								router,
								`${params.params.uuid}`
							)
						);
					} else {
						dispatch(addHospital(form.getFieldsValue(), router));
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
				// <div className="flex flex-col space-y-2">
				<>
					<BaseUploadDraggerHospital
						uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${API_PATH.MINIO.UPLOAD}`}
						subFolderPath="hospital/sp7"
						bearer={`${Cookies.get("Bearer")}`}
						onChangeFunction={(e) => {
							dispatch(
								setHospitalForm({
									...hospitalForm,
									files: { sp7: e },
								})
							);
						}}
					/>
					<button
						onClick={async () => {
							if (files.sp7.length) {
								const errorArray = [];
								errorArray.push({
									name: "sp7StartDated",
									errors: _.isEmpty(form.getFieldsValue().sp7StartDated)
										? [`กรุณาใส่ ${names.sp7StartDated}`]
										: undefined,
								});
								errorArray.push({
									name: "sp7EndDate",
									errors: _.isEmpty(form.getFieldsValue().sp7EndDate)
										? [`กรุณาใส่ ${names.sp7EndDate}`]
										: undefined,
								});
								form.setFields(errorArray);

								/**
								 * เงื่อนไข checkCondition คือตรวจสอบว่าทุก errors key ใน errorArray เป็น Undefined หรือไม่
								 * ถ้าใช่จะ return true
								 * */
								const checkCondition = _.every(errorArray, (obj) => {
									return _.isUndefined(obj.errors);
								});
								// /**
								//  * จาก checkCondition ด้านบน จะ return true หาก errors key ทุกตัวเป็น undefined
								//  * แต่ต้องการเช็คเงื่อนไขว่า ถ้าทุกตัว "ไม่ใช่" undefined จึงจะทำเงื่อนไขใดๆ
								//  */
								// if (!checkCondition) {
								// 	return;
								// }
								if (checkCondition) {
									await dispatch(
										handleUploadHospital(
											files.sp7,
											"hospital/sp7",
											hospitalForm
										)
									);

									dispatch(
										setHospitalForm({
											...hospitalForm,
											files: { sp7: [] },
										})
									);
								}
							}
						}}
					>
						Upload Multiple file
					</button>
					<BaseHeaderNameAndSwitch
						textHeader={"แก้ไขข้อมูลสถานพยาบาล"}
						onChangeSwitchFunction={(e) => {
							dispatch(
								setHospitalForm({
									...hospitalForm,
									isActive: e ? IsActive.Y : IsActive.N,
								})
							);
						}}
						switchCheckValue={_.trim(hospitalForm.isActive) === IsActive.Y}
					/>
					<BaseForm
						name={"hospitalForm"}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						initialValues={{
							...hospitalForm,
						}}
						extraForm={form}
					>
						<BaseCollapse items={firstSection} defaultActiveKey={"1"} />
						<BaseCollapse items={secondSection} defaultActiveKey={"2"} />
						<BaseCollapse items={thSection} defaultActiveKey={"3"} />
						<BaseCollapse items={fourthSection} defaultActiveKey={"4"} />

						<div className="flex justify-end">
							<BaseButtonCancel
								className="mr-3"
								onClick={() => {
									router.push(LINKS.HOSPITAL.link);
								}}
							/>
							<BaseButtonDraft className="mr-3" />
							<BaseButtonSave className="" htmlType="submit" />
						</div>
					</BaseForm>
				</>
			)}
		</>
	);
};
export default dynamic(() => Promise.resolve(HospitalFormPage), { ssr: false });
