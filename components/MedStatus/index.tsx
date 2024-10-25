import React from "react";
import StatusIndicator, {
	StatusConfig,
	statusConfigMap,
	StatusIndicatorType,
} from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";

type MedStatusType = "แพทย์" | "สถานพยาบาล" | "อื่นๆ";

type ExtendStatusType = MedStatusType | StatusIndicatorType;

interface MedStatusProps {
	type: ExtendStatusType;
	height?: string;
	classNameText?: string;
}

export default function MedStatus(props: MedStatusProps) {
	const medStatusConfigMap: Record<ExtendStatusType, StatusConfig> = {
		...statusConfigMap,
		แพทย์: {
			bgColor: "#BBF7D0",
			dotColor: "#22C55E",
			textColor: "#22C55E",
			statusText: "แพทย์",
		},
		สถานพยาบาล: {
			bgColor: "#BBF7D0",
			dotColor: "#22C55E",
			textColor: "#22C55E",
			statusText: "แพทย์",
		},
		อื่นๆ: {
			bgColor: "#BBF7D0",
			dotColor: "#22C55E",
			textColor: "#22C55E",
			statusText: "แพทย์",
		},
	};
	return (
		<StatusIndicator
			{...props}
			status="Y"
			customStatusTag={medStatusConfigMap[props.type]}
		/>
	);
}
