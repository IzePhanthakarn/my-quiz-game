import React from "react";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import InfoCircleFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/InfoCircleFilled";
export default function MoreDetails(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div>
			<BaseHorizontalHeader
				title={"รายละเอียดเพิ่มเติม"}
				icons={<InfoCircleFilled />}
			/>
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 p-2">
				<BaseItemInput label="เลขที่บัญชีนายจ้าง" itemName={""} />
				<BaseItemInput label="ชื่อสถานประกอบการ" itemName={""} />
				<div></div>
				<div></div>
				<BaseItemInput label="สาเหตุที่ประสบอันตราย" itemName={""} />
				<BaseItemInput label="ผลของการประสบอันตราย" itemName={""} />
				<BaseItemInput label="ระดับความรุนแรง" itemName={""} />
			</div>
		</div>
	);
}
