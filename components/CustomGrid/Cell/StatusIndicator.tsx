import { cn } from "@/utils/libs/client";
import React from "react";
import { STATUS } from "./model";

interface Props {
	status: string;
}

export default function StatusIndicator({ status }: Props) {
	return (
		<div
			className={cn(
				"w-2 h-2 rounded-full",
				status === STATUS.ACTIVE ? "bg-green-500" : "bg-red-500"
			)}
		></div>
	);
}
