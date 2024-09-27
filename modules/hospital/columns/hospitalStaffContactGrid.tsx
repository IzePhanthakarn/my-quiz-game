"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { HospitalStaffContact } from "@/modules/hospital/redux/models/hospitalStaffContactModel";
import { setDialog } from "@/redux/slices/dialog";
import { BaseDialog } from "@/redux/slices/dialog/model";
import { setHospitalStaffContactGridFilterUuidExclusionList } from "../service";

interface Props {
	hospitalStaffContact: HospitalStaffContact;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
	dialog: BaseDialog;
}

export const HospitalStaffContactGrid = (props: Props) => {
	const { hospitalStaffContact, dispatch, params, dialog } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: false,
				key: "order",
				dataIndex: "order",
				title: "ลำดับ",
				width: "150px",
			},
			{
				sorter: false,
				key: "firstName",
				dataIndex: "firstName",
				title: "ชื่อ - นามสกุล ผู้ติดต่อ",
				render: (_, { firstName, lastName }) => {
					return (
						<>
							{firstName} {lastName}
						</>
					);
				},
			},
			{
				sorter: false,
				key: "position",
				dataIndex: "position",
				title: "ตำแหน่งของผู้ติดต่อ",
			},
			{
				sorter: false,
				key: "contact",
				dataIndex: "contact",
				title: "เบอร์ติดต่อ",
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<DeleteFilled
							onClick={async () => {
								dispatch(
									setDialog({
										...dialog,
										async onConfirm() {
											await dispatch(
												setHospitalStaffContactGridFilterUuidExclusionList(
													hospitalStaffContact,
													uuid
												)
											);
										},
										isOpenBaseConfirmDialog: true,
										content: "",
										headerText: "ต้องการลบใช่หรือไม่",
									})
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalStaffContact, dialog, params]
	);
	return columns;
};
