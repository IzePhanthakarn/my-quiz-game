"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import _ from "lodash";
import { LINKS } from "../../constants/links";
import MasterDataFormLayout from "wcf-component-lib/src/layout/MasterDataFormLayout";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useRouter } from "next/navigation";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import dynamic from "next/dynamic";
import { findScope, getScopesPermissions } from "@/utils";
import { setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";
import { modelDiaplomaDetail } from "./redux/form/model";
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
import BaseConfirmDialog from "wcf-component-lib/src/components/BaseConfirmDialog";
import { DiplomaForm } from "./redux/model";
import { diplomaName } from "./interface/name";

const Form = (params: UuidFormPageProps) => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const { diplomaDetail, isOpenBaseConfirmDialog } = useSelector(
		(state: SliceModel) => ({
			diplomaDetail: state.diploma.diplomaDetail,
			isOpenBaseConfirmDialog: state.dialog.isOpenBaseConfirmDialog,
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

	const onFinish: FormProps<DiplomaForm>["onFinish"] = () => {
		dispatch(setIsOpenBaseConfirmDialog(true));
	};

	return (
		<>
			<BaseConfirmDialog
				isOpen={isOpenBaseConfirmDialog}
				confirmFunction={() => {
					if (_.isEmpty(params.params.uuid)) {
						dispatch(addDiploma(diplomaDetail, router));
					} else {
						dispatch(updateDiploma(diplomaDetail, router));
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
					textHeader="วุฒิบัตรเฉพาะทาง"
					isEdit={!_.isEmpty(params.params.uuid) ? true : false}
					initialValues={diplomaDetail}
					onFinish={onFinish}
					switchCheckValue={_.trim(diplomaDetail.isActive) === IsActive.Y}
					pageLevel={params.params.uuid ? "edit" : "add"}
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
								pageLevel={params.params.uuid ? "edit" : "add"}
								label={diplomaName.diplomaType}
								itemName="diplomaType"
								rules={diplomaTypeSchema}
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
								pageLevel={params.params.uuid ? "edit" : "add"}
								label={diplomaName.diplomaName}
								itemName="diplomaName"
								rules={diplomaNameSchema}
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
		</>
	);
};
export default dynamic(() => Promise.resolve(Form), { ssr: false });
