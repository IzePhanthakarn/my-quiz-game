"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { DoctorBankList } from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";

interface Props {
	doctorBankGrid: DoctorBankList[];
	dispatch: AppDispatch;
}

export const GetColumns = (props: Props) => {
	const { doctorBankGrid, dispatch } = props;
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
