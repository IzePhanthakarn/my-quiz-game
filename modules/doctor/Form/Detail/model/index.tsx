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

export const getItemsForm = (props: Props) => {
	const itemsTables: CollapseProps["items"] = [
		{
			key: "1",
			label: "รายละเอียดแพทย์",
			children: <DoctorDetailForm {...props} />,
		},
		{
			key: "2",
			label: "สังกัดโรงพยาบาล",
			children: <DoctorHospital />,
		},
		{
			key: "3",
			label: "ข้อมูลวุฒิบัตรเฉพาะทาง",
			children: <DoctorDetail />,
		},
		{
			key: "4",
			label: "รายละเอียดการจ่าย",
			children: <DoctorBank />,
		},
		{
			key: "5",
			label: "ข้อมูลการอบรม",
			children: <Training />,
		},
	];
	return itemsTables;
};
