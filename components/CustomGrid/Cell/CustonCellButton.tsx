"use client";

import { findScope, getScopesPermissions } from "@/utils";
import { BUTTON_MODE } from "./model";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import Row from "@/components/Row";
import { useRouter } from "next/navigation";

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
			<Row className="items-center space-x-1">
				<Button className={`bg-[#2196F3] text-white`}>รายละเอียด</Button>
				<Button className={`bg-[#D32F2F] text-white`}>ลบ</Button>
			</Row>
		);
	} else if (mode === BUTTON_MODE.VIEW_ONLY) {
		return (
			<Row className="items-center">
				<Button className={`bg-[#2196F3] text-white`}>ดูรายละเอียด</Button>
			</Row>
		);
	} else if (mode === BUTTON_MODE.VIEW_EDIT_ICON) {
		return (
			<Row className="items-center space-x-1">
				{(write || read) && (
					<Button
						className="border-0 h-fit p-0"
						onClick={() => router.push(editLink ?? "")}
					>
						<img className="cursor-pointer " src="/med/icons/edit.svg" alt="" />
					</Button>
				)}
			</Row>
		);
	}
};

const CustomCellButton = ({ mode, editLink }: Props) => {
	return <InputEditButtonCell mode={mode} editLink={editLink} />;
};

export default CustomCellButton;
