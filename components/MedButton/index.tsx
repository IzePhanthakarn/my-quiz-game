import React from "react";
import { BaseButton } from "wcf-component-lib/src/components";
import { ButtonProps } from "wcf-component-lib/src/components/BaseButton";
import { MedKey } from "../MedDivPermission/model";

export default function MedButton(props: ButtonProps<MedKey>) {
	return <BaseButton<MedKey> {...props} />;
}
