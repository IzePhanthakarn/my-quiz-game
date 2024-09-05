import React from "react";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handleOnSubmitRequestForm } from "../../service";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SliceModel } from "@/redux/slices/model";
import { handleOnExportPdf } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { useRouter } from "next/navigation";

export default function Collapse(props: { uuid: boolean }) {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { uuid } = props;

	const { detail } = useSelector(
		(state: SliceModel) => ({
			detail: state.requestForm.detail,
		}),
		shallowEqual
	);

	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "ข้อมูลบันทึกใบคำขอค่าตรวจประเมิน",
			children: <Section1 {...props} />,
		},
		{
			key: "2",
			label: "ข้อมูลแพทย์ผู้ประเมิน",
			children: <Section2 {...props} />,
		},
		{
			key: "3",
			label: "เลขที่ใบคำขอค่าตรวจประเมิน",
			children: <Section3 {...props} />,
		},
	];
	return (
		<div className="flex flex-col mt-2 space-y-2">
			<p className="text-2xl">สืบค้นใบคำขอรับค่าตรวจประเมิน MED01001</p>
			<BaseCollapse items={items} defaultActiveKey={["1", "2", "3"]} />
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
		</div>
	);
}
