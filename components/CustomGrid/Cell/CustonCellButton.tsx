"use client";

import { findScope, getScopesPermissions } from "@/utils";
import { BUTTON_MODE } from "./model";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import { useRouter } from "next/navigation";
import BaseRow from "wcf-component-lib/src/components/BaseRow";
import EditFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/EditFilled";

interface Props {
	mode: BUTTON_MODE;
	editLink?: string;
}

const InputEditButtonCell = ({ mode, editLink }: Props) => {
	const router = useRouter();
	const scopes = [
		"location:read",
		"location:write",
		"resource:read",
		"resource:write",
		"netdb:select",
		"netdb:update",
		"changs-req:read",
		"changs-req:write",
	];

	const resourceScopes = findScope(scopes, "resource:");
	const { read, write } = getScopesPermissions(resourceScopes);

	if (mode === BUTTON_MODE.VIEW_EDIT) {
		return (
			<BaseRow className="items-center space-x-1">
				<Button className={`bg-[#2196F3] text-white`}>รายละเอียด</Button>
				<Button className={`bg-[#D32F2F] text-white`}>ลบ</Button>
			</BaseRow>
		);
	} else if (mode === BUTTON_MODE.VIEW_ONLY) {
		return (
			<BaseRow className="items-center">
				<Button className={`bg-[#2196F3] text-white`}>ดูรายละเอียด</Button>
			</BaseRow>
		);
	} else if (mode === BUTTON_MODE.VIEW_EDIT_ICON) {
		return (
			<BaseRow className="items-center space-x-1">
				{(write || read) && (
					<EditFilled
						onClick={() => router.push(editLink ?? "")}
						className="text-2xl p-2.5"
						style={{
							color: "#193f49",
							backgroundColor: "#ededed",
							borderRadius: "99%",
						}}
					/>
					// <Button
					// 	className="border-0 h-fit bg-[#A4B5B9] p-2.5 rounded-full"
					// 	onClick={() => router.push(editLink ?? "")}
					// >
					// 	<img className="cursor-pointer " src="/med/icons/edit.svg" alt="" />
					// </Button>
				)}
			</BaseRow>
		);
	}
};

const CustomCellButton = ({ mode, editLink }: Props) => {
	return <InputEditButtonCell mode={mode} editLink={editLink} />;
};

export default CustomCellButton;
