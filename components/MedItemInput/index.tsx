import React from "react";
import BaseItemInput, {
	BaseItemInputProps,
} from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import { MedKey } from "../MedDivPermission/model";

export default function MedItemInput(props: BaseItemInputProps<MedKey>) {
	return <BaseItemInput<MedKey> {...props} />;
}
