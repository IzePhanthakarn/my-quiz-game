"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IsActive } from "../../constants/constants";
import _ from "lodash";
import { LINKS } from "../../constants/links";
import MasterDataForm from "wcf-component-lib/src/layout/MasterDataForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenDialog } from "../../redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { DiplomaDetail, modelDiaplomaDetail } from "./redux/form/model";
import { setDiplomaDetail } from "./redux";
import {
	addDiploma,
	initGetDiplomaDetail,
	updateDiploma,
} from "./service/detail";
import {
	diplomaNameSchema,
	diplomaTypeSchema,
} from "./field-validation/diplomaForm";

const Form = (params: UuidFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { diplomaDetail, isOpen } = useSelector(
		(state: SliceModel) => ({
			diplomaDetail: state.diploma.diplomaDetail,
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		(async () => {
			if (!isInit) {
				if (!_.isEmpty(params.params.uuid)) {
					await dispatch(initGetDiplomaDetail(params));
				} else {
					dispatch(setDiplomaDetail(modelDiaplomaDetail));
				}
				setIsInit(true);
			}
		})();
	}, []);

	const onFinish: FormProps<DiplomaDetail>["onFinish"] = () => {
		if (_.isEmpty(params.params.uuid)) {
			dispatch(addDiploma(diplomaDetail));
		} else {
			dispatch(updateDiploma(diplomaDetail));
		}
	};

	const onFinishFailed: FormProps<DiplomaDetail>["onFinishFailed"] = (_) => {};

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
				}}
				onConfirm={() => {
					router.push(LINKS.DIPLOMA.link);
				}}
			/>

			{isInit && (
				<MasterDataForm
					disabled={_.isEmpty(write)}
					initialValues={diplomaDetail}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					switchCheckValue={_.trim(diplomaDetail.isActive) === IsActive.Y}
					onChangeSwitchFunction={(e) => {
						dispatch(
							setDiplomaDetail({
								...diplomaDetail,
								isActive: e ? IsActive.Y : IsActive.N,
							})
						);
					}}
					cancelFunction={() => {
						router.push(LINKS.DIPLOMA.link);
					}}
					inputs={
						<div className="grid gap-x-4 gap-y-2 grid-cols-4">
							<BaseItemInput
								disabled={!_.isEmpty(params.params.uuid)}
								label="Diploma Type"
								itemName="diplomaType"
								rules={diplomaTypeSchema}
								value={diplomaDetail.diplomaType}
								onChangeFunction={(e) => {
									dispatch(
										setDiplomaDetail({
											...diplomaDetail,
											diplomaType: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								disabled={_.isEmpty(write)}
								label="Diploma Name"
								itemName="diplomaName"
								rules={diplomaNameSchema}
								value={diplomaDetail.diplomaName}
								onChangeFunction={(e) => {
									dispatch(
										setDiplomaDetail({
											...diplomaDetail,
											diplomaName: e.target.value,
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
