import { DiplomaForm, modelDiplomaForm } from "@/modules/diploma/redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { DoctorData, DoctorPostalList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_TYPE } from "@/components/MedDropDown/model";
import { handlePostalRows } from "./service";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import { SliceModel } from "@/redux/slices/model";
interface Props {
	doctorPostalGrid: DoctorPostalList[];
	doctorCode: string;
	editId?: number;
}

export default function PostalCodeDialog(props: Props) {
	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);
	const { doctorPostalGrid, doctorCode, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [postalCode, setPostalCode] = React.useState("");
	const [postalName, setPostalName] = React.useState("");

	useEffect(() => {
		if (editId) {
			const data = _.find(doctorPostalGrid, ["id", editId]);
			setPostalCode(data?.postalId ?? "");
			setPostalName(
				findLabelAddress(data?.postalId ?? "", ADDRESS.POSTAL_NAME_BY_ID) ?? ""
			);
		} else {
			setPostalCode("");
			setPostalName("");
		}
	}, [isOpen]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลไปรษณีย์ปลายทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					className="h-full w-full"
					label="รหัสไปรษณีย์"
					type={DROPDOWN_TYPE.ADDRESS}
					value={_.isEmpty(postalName) ? null : postalName}
					getValue={(e) => {
						setPostalCode(e.postalCode);
						setPostalName(e.postalName);
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isEmpty(postalCode)}
				onClick={() => {
					dispatch(
						handlePostalRows({
							postalCode,
							doctorCode,
							doctorPostalGrid,
							editId,
						})
					);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
