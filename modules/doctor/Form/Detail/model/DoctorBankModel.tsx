"use client";

import { DoctorBankList } from "@/modules/doctor/redux/form/model";
import { useMemo } from "react";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import BankDialog from "@/modules/doctor/DialogContent/BankDialog";
import { handleBankRows } from "@/modules/doctor/DialogContent/service";
import { modelDialog } from "@/redux/slices/dialog/model";
import { findNameDisplay } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";

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
				dataIndex: "bankDigitCode",
				key: "bankDigitCode",
				render: (_: any, { bankDigitCode }: any) => {
					const bankDisplay = findNameDisplay(SESSION_NAME.BANK, bankDigitCode);
					return <p>{bankDisplay}</p>;
				},
			},
			{
				title: "สาขาธนาคาร",
				dataIndex: "bankSortingCode",
				key: "bankSortingCode",
				render: (_: any, { bankSortingCode }: any) => {
					const bankBranchDisplay = findNameDisplay(
						SESSION_NAME.BANK_BRANCH,
						bankSortingCode
					);
					return <p>{bankBranchDisplay}</p>;
				},
			},
			{
				title: "เลขที่บัญชี",
				dataIndex: "bankAccount",
				key: "bankAccount",
			},
			{
				title: "พร้อมเพย์",
				dataIndex: "promptpay",
				key: "promptpay",
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
										...modelDialog,
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
