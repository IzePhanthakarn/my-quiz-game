import React, { useEffect } from "react";
import { DoctorBankList } from "../redux/form/model";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import _ from "lodash";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleBankRows } from "./service";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { SliceModel } from "@/redux/slices/model";

interface Props {
	doctorBankGrid: DoctorBankList[];
	editId?: number;
}

export interface Bank {
	bankAccountName: string;
	bankDigitCode: string | null;
	bankSortingCode: string | null;
	bankAccount: string;
	promptpay: string;
	uuid: string | null;
}

const modelBank: Bank = {
	bankAccountName: "",
	bankDigitCode: null,
	bankSortingCode: null,
	bankAccount: "",
	promptpay: "",
	uuid: null,
};

export default function BankDialog(props: Props) {
	const { doctorBankGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();
	const [bank, setBank] = React.useState(modelBank);

	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	useEffect(() => {
		setBank(modelBank);
		if (editId) {
			const data = _.find(doctorBankGrid, ["id", editId]);
			setBank({ ...bank, ...data });
		}
	}, [doctorBankGrid, editId, isOpen]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					type={SESSION_NAME.BANK}
					className="h-full w-full"
					label="ธนาคาร"
					getValue={(e) =>
						setBank({ ...bank, bankDigitCode: e, bankSortingCode: null })
					}
					value={bank.bankDigitCode}
				/>
				<MedDropDown
					notForm={true}
					type={SESSION_NAME.BANK_BRANCH}
					className="h-full w-full"
					disabled={_.isEmpty(bank.bankDigitCode)}
					label="สาขาธนาคาร"
					getValue={(e) => setBank({ ...bank, bankSortingCode: e })}
					value={bank.bankSortingCode}
				/>
				<BaseItemInput
					notForm
					label="เลขที่บัญชีธนาคาร"
					labelPosition={BaseFormItemPosition.TOP}
					value={bank.bankAccount}
					onChangeFunction={(e) =>
						setBank({ ...bank, bankAccount: e.target.value })
					}
				/>
				<BaseItemInput
					notForm
					label="พร้อมเพย์"
					labelPosition={BaseFormItemPosition.TOP}
					value={bank.promptpay}
					onChangeFunction={(e) =>
						setBank({ ...bank, promptpay: e.target.value })
					}
				/>
				<BaseItemInput
					notForm
					label="ชื่อบัญชี"
					labelPosition={BaseFormItemPosition.TOP}
					value={bank.bankAccountName}
					onChangeFunction={(e) =>
						setBank({ ...bank, bankAccountName: e.target.value })
					}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				// disabled={_.some(_.values(bank), (value) => value === "")}
				onClick={() => {
					dispatch(handleBankRows({ bank, doctorBankGrid, editId }));
				}}
				label="บันทึก"
			/>
		</div>
	);
}
