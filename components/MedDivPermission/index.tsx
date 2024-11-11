import React from "react";
import DivPermission from "wcf-component-lib/src/components/BaseDivPermission";
import { MedKey } from "./model";

interface Props {
	children: React.ReactNode;
	pageLevel: MedKey;
}

export default function MedDivPermission(props: Props) {
	const { children, pageLevel } = props;
	return (
		<DivPermission<MedKey> pageLevel={pageLevel}>{children}</DivPermission>
	);
}
