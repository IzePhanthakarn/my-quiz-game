import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import DoctorHospital from "../tables/DoctorHospital";
import DoctorDetail from "../tables/DoctorDetail";
import DoctorBank from "../tables/DoctorBank";
import Training from "../tables/Training";
import DoctorDetailForm from "..";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form/Form";

interface Props {
	form: FormInstance<any>;
	onFinish: (values: any) => void;
}

export const getBaseItemsForm = (props: Props) => {
	const itemsTables: CollapseProps["items"] = [
		{
			key: "1",
			label: (
				<div className="flex flex-col space-y-4">
					<p className="header-card">ข้อมูลทั่วไป</p>
					<p className="text-help text-[#B7BEC5]">
						ข้อมูลภาพรวมและรายละเอียดของแพทย์
					</p>
				</div>
			),
			children: <DoctorDetailForm {...props} />,
		},
	];
	return itemsTables;
};

export const getExtendedItemsForm = () => {
	const itemsTables: CollapseProps["items"] = [
		{
			key: "2",
			label: (
				<div className="flex flex-col space-y-4">
					<p className="header-card">สังกัดโรงพยาบาล</p>
					<p className="text-help text-[#B7BEC5]">
						ข้อมูลภาพรวมและรายละเอียดสังกัดโรงพยาบาลสำหรับแพทย์
					</p>
				</div>
			),
			children: <DoctorHospital />,
		},
		{
			key: "3",
			label: (
				<div className="flex flex-col space-y-4">
					<p className="header-card">ข้อมูลวุฒิบัตรเฉพาะทาง</p>
					<p className="text-help text-[#B7BEC5]">
						ข้อมูลภาพรวมและรายละเอียดวุฒิบัตรเฉพาะทางสำหรับแพทย์
					</p>
				</div>
			),
			children: <DoctorDetail />,
		},
		{
			key: "4",
			label: (
				<div className="flex flex-col space-y-4">
					<p className="header-card">รายละเอียดการจ่าย</p>
					<p className="text-help text-[#B7BEC5]">
						ข้อมูลภาพรวมและรายละเอียดการจ่ายสำหรับแพทย์
					</p>
				</div>
			),
			children: <DoctorBank />,
		},
		{
			key: "5",
			label: (
				<div className="flex flex-col space-y-4">
					<p className="header-card">ข้อมูลการอบรม</p>
					<p className="text-help text-[#B7BEC5]">
						ข้อมูลภาพรวมและรายละเอียดการอบรมสำหรับแพทย์
					</p>
				</div>
			),
			children: <Training />,
		},
	];
	return itemsTables;
};
