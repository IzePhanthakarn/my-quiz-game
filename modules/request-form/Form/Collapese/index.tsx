import React from "react";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleOnSubmitRequestForm } from "../../service";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SliceModel } from "@/redux/slices/model";
import { handleOnExportPdf } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { useRouter } from "next/navigation";
import Assessment from "./Assessment";
import Information from "./Information";
import { BaseColumn } from "wcf-component-lib/src/components";

export default function Collapse(props: { uuid: boolean }) {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { uuid } = props;

	const { detail } = useSelector(
		(state: SliceModel) => ({ detail: state.requestForm.detail }),
		shallowEqual
	);

	const collapseList: CollapseProps["items"] = [
		{
			key: "1",
			label: "เลขที่ใบคำขอค่าตรวจประเมิน : 110065/00025",
			children: <Assessment {...props} />,
		},
		{
			key: "2",
			label: "ข้อมูลบันทึกใบคำขอค่าตรวจประเมิน ",
			children: <Information {...props} />,
		},
	];

	return (
		<BaseColumn>
			{collapseList.map((e, i: number) => (
				<BaseCollapse items={[e]} key={e.key} defaultActiveKey={i + 1} />
			))}
			<div className="flex justify-center space-x-4">
				<BaseButton
					htmlType="submit"
					className="w-1/6 self-center"
					label={"บันทึก"}
					onClick={() => {
						dispatch(handleOnSubmitRequestForm(uuid, detail, router));
					}}
				/>
				<BaseButton
					htmlType="submit"
					disabled={uuid}
					className="w-1/6 self-center"
					label={"พิมพ์ใบคำขอ"}
					onClick={() => {
						dispatch(handleOnExportPdf(detail, REPORT_TYPES.MED01001, true));
					}}
				/>
			</div>
		</BaseColumn>
	);
}
