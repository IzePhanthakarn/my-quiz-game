"use client";

import React from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { GetColumns } from "../column/column";
import { row } from "./row";
import { useRouter } from "next/navigation";

export default function ReportDoctorList() {
	const router = useRouter();
	return (
		<div>
			<div className="bg-white flex flex-col p-6 rounded-2xl">
				<BaseGrid rows={row} columns={GetColumns(router)} twoToneColor={true} />
			</div>
		</div>
	);
}
