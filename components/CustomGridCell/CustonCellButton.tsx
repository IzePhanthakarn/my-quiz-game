"use client";

import { findScope, getScopesPermissions } from "@/utils";
import { BUTTON_MODE } from "./model";
import Button from "antd/es/button";
import Link from "antd/es/typography/Link";
import Row from "../Row";

interface Props {
	mode: BUTTON_MODE;
	editLink?: string;
	viewLink?: string;
}

const InputEditButtonCell = ({ mode, editLink, viewLink }: Props) => {
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
				{read && (
					<Link href={viewLink ?? ""}>
						<img src="/icons/view.svg" alt="" />
					</Link>
				)}
				{write && (
					<Link href={editLink ?? ""}>
						<img src="/icons/edit.svg" alt="" />
					</Link>
				)}
			</Row>
		);
	}
};

const CustomCellButton = ({ mode, editLink, viewLink }: Props) => {
	return (
		<InputEditButtonCell viewLink={viewLink} mode={mode} editLink={editLink} />
	);
};

export default CustomCellButton;
