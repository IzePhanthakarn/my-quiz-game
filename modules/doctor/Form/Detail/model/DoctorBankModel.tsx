"use client";

import {
	DoctorBankList,
	DoctorPostalList,
} from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import BankDialog from "@/modules/doctor/DialogContent/BankDialog";
import { handleBankRows } from "@/modules/doctor/DialogContent/service";

interface BankProps {
	doctorBankGrid: DoctorBankList[];
	dispatch: AppDispatch;
}

export const GetColumnBank = (props: BankProps) => {
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
							editFunction={() => {
								dispatch(
									setDialog({
										isOpen: true,
										uniqueContent: <BankDialog {...props} editId={id} />,
									})
								);
							}}
							deleteFunction={() => {
								dispatch(
									handleBankRows({
										doctorBankGrid,
										editId: id,
										isDelete: true,
									})
								);
							}}
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
