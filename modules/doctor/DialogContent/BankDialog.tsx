import React, { useEffect } from "react";
import { DoctorBankList } from "../redux/form/model";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import _ from "lodash";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleBankBranchDropdown, handleBankRows } from "./service";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { SliceModel } from "@/redux/slices/model";
import { findNameDisplay } from "@/components/MedDropDown/service";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { rules } from "./field-validation/FormValidation";
import Form from "wcf-component-lib/node_modules/antd/es/form";

interface Props {
	doctorBankGrid: DoctorBankList[];
	editId?: number;
}

export interface BankModal {
	bankId: number;
	bankAccountName: string;
	bankDigitCode: string | null;
	bankSortingCode: string | null;
	bankAccount: string;
	promptpay: string;
	uuid: string | null;
}

const modelBank: BankModal = {
	bankId: 0,
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
	const [form] = Form.useForm<BankModal>();
	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	const onFinish: FormProps<BankModal>["onFinish"] = () => {
		dispatch(handleBankRows({ bank, doctorBankGrid, editId }));
	};

	useEffect(() => {
		setBank(modelBank);
		if (editId) {
			const data = _.find(doctorBankGrid, ["id", editId]);
			// const bankSortingCode = data?.bankSortingCode;
			// const bankBranchName = findNameDisplay(
			// 	SESSION_NAME.BANK_BRANCH,
			// 	bankSortingCode
			// );
			setBank({
				...bank,
				...data,
				// bankSortingCode: bankBranchName,
			});
		}
	}, [doctorBankGrid, editId, isOpen]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลธนาคาร</p>
			<BaseForm initialValues={bank} onFinish={onFinish} extraForm={form}>
				<div className="w-full">
					<MedDropDown
						itemName={"bankDigitCode"}
						type={SESSION_NAME.BANK}
						className="h-full w-full"
						label="ธนาคาร"
						rules={rules.bankDigitCode}
						getValue={(e) =>
							setBank({ ...bank, bankDigitCode: e, bankSortingCode: null })
						}
					/>
					<MedDropDown
						type={SESSION_NAME.BANK_BRANCH}
						itemName={"bankSortingCode"}
						className="h-full w-full"
						rules={rules.bankSortingCode}
						option={handleBankBranchDropdown(bank.bankDigitCode ?? "")}
						disabled={_.isEmpty(
							handleBankBranchDropdown(bank.bankDigitCode ?? "")
						)}
						label="สาขาธนาคาร"
						labelRender={() =>
							findNameDisplay(SESSION_NAME.BANK_BRANCH, bank.bankSortingCode)
						}
						getValue={(e) => setBank({ ...bank, bankSortingCode: e })}
					/>
					<BaseItemInput
						label="เลขที่บัญชีธนาคาร"
						itemName={"bankAccount"}
						labelPosition={BaseFormItemPosition.TOP}
						rules={rules.bankAccount}
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
			</BaseForm>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				// disabled={_.some(_.values(bank), (value) => value === "")}
				onClick={() => {
					form.submit();
				}}
				label="บันทึก"
			/>
		</div>
	);
}
