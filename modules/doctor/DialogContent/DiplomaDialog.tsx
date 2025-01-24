"use client";

import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleDoctorDetailRows } from "./service";
import { DoctorDetailList, DoctorData } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { SliceModel } from "@/redux/slices/model";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { rules } from "./field-validation/FormValidation";
import Form from "wcf-component-lib/node_modules/antd/es/form";
interface Props {
	doctorDetailGrid: DoctorDetailList[];
	editId?: number;
}

export default function DiplomaDialog(props: Props) {
	const { doctorDetailGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();
	const [form] = Form.useForm<string | null>();

	const [diplomaType, setDiplomaType] = React.useState<string | null>(null);
	const [uuid, setUuid] = React.useState<string | null>(null);

	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		setDiplomaType(null);
		if (editId) {
			const data = _.find(doctorDetailGrid, ["id", editId]);
			const handle = _.get(data, "diplomaType");
			if (typeof handle === "object")
				setDiplomaType(_.get(handle, "diplomaType") ?? null);
			else setDiplomaType(handle ?? null);
			setUuid(data?.uuid ?? null);
		}
	}, [doctorDetailGrid, isOpen, editId]);

	const onFinish: FormProps<string | null>["onFinish"] = () => {
		dispatch(
			handleDoctorDetailRows({
				diplomaType: diplomaType,
				doctorDetailGrid,
				editId,
				uuid,
			})
		);
	};

	return (
		<div className="flex space-y-2 flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<BaseForm
				initialValues={{ diplomaType }}
				onFinish={onFinish}
				extraForm={form}
			>
				<div className="w-full">
					<MedDropDown
						// notForm={true}
						itemName={"diplomaType"}
						rules={rules.diplomaType}
						type={SESSION_NAME.DIPLOMA}
						className="h-full w-full"
						label="วุฒิบัตรเฉพาะทาง"
						getValue={(e) => setDiplomaType(e)}
						value={_.isEmpty(diplomaType) ? null : diplomaType}
					/>
				</div>
			</BaseForm>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isEmpty(diplomaType)}
				onClick={() => {
					form.submit();
				}}
				label="บันทึก"
			/>
		</div>
	);
}
