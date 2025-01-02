import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { DoctorPostalList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { handlePostalRows } from "./service";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import { SliceModel } from "@/redux/slices/model";

interface Props {
	doctorPostalGrid: DoctorPostalList[];
	editId?: number;
}

export default function PostalCodeDialog(props: Props) {
	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);
	const { doctorPostalGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const modelPostal = {
		postalId: "",
		postalName: "",
	};

	const [postal, setPostal] = React.useState(modelPostal);

	useEffect(() => {
		setPostal(modelPostal);
		if (!_.isUndefined(editId)) {
			const data = _.find(doctorPostalGrid, ["id", editId]);
			setPostal({
				...postal,
				postalId: data?.postalId ?? "",
				postalName:
					findLabelAddress(data?.postalId ?? "", ADDRESS.POSTAL_NAME_BY_ID) ??
					"",
			});
		}
	}, [doctorPostalGrid, isOpen, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลไปรษณีย์ปลายทาง</p>
			<div className="w-full">
				<MedDropDown
					notForm={true}
					className="h-full w-full"
					label="รหัสไปรษณีย์"
					type={SESSION_NAME.POSTAL_ID}
					value={
						_.isEmpty(postal.postalName)
							? null
							: `${postal.postalId}-${postal.postalName}`
					}
					getValue={(e) => {
						setPostal({
							...postal,
							postalId: e.postalId,
							postalName: e.postalName,
						});
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.isUndefined(postal.postalId)}
				onClick={() => {
					dispatch(
						handlePostalRows({
							postalId: postal.postalId,
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
