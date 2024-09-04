"use client";

import {
	DoctorBankList,
	DoctorPostalList,
} from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";

interface BankProps {
	doctorBankGrid: DoctorBankList[];
	dispatch: AppDispatch;
}

interface PostalProps {
	doctorPostalGrid: DoctorPostalList[];
	dispatch: AppDispatch;
}

export const GetColumnBank = (props: BankProps) => {
	const { doctorBankGrid } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "ชื่อธนาคาร",
				dataIndex: "bankAccount",
				key: "bankAccount",
			},
			{
				title: "สาขาธนาคาร",
				dataIndex: "bankDigitCode",
				key: "bankDigitCode",
			},
			{
				title: "เลขที่บัญชี",
				dataIndex: "bankSortingCode",
				key: "bankSortingCode",
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_: any, { id }: any) => {
					return (
						<CustomCellButton
							editFunction={() => {}}
							deleteFunction={() => {}}
							mode={BUTTON_MODE.EDIT_DELETE_ICON}
						/>
					);
				},
			},
		],
		[doctorBankGrid]
	);

	return columns;
};

export const GetColumnPostal = (props: PostalProps) => {
	const { doctorPostalGrid } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "รหัสไปรษณีย์",
				dataIndex: "postalId",
				key: "postalId",
			},
			{
				title: "ชื่อไปรษณีย์",
				dataIndex: "postalId",
				key: "postalId",
				render: (_: any, { postalId }: any) => {
					return <p>{findLabelAddress(postalId, ADDRESS.POSTAL_NAME_BY_ID)}</p>;
				},
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_: any, { id }: any) => {
					return (
						<CustomCellButton
							editFunction={() => {}}
							deleteFunction={() => {}}
							mode={BUTTON_MODE.EDIT_DELETE_ICON}
						/>
					);
				},
			},
		],
		[doctorPostalGrid]
	);

	return columns;
};
