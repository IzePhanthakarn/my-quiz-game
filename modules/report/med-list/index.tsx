"use client";

import React from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { row } from "./row";
import { useRouter } from "next/navigation";
import { GetColumns } from "../column/column";

export default function ReportMedList() {
	const router = useRouter();
	return (
		<div>
			<div className="bg-white flex flex-col p-6 rounded-2xl">
				<BaseGrid rows={row} columns={GetColumns(router)} twoToneColor={true} />
			</div>
		</div>
	);
}
