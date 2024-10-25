"use client";

import React from "react";
import BaseUploadDragger from "wcf-component-lib/src/components/BaseUploadDragger";
import InboxOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/InboxOutlined";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { Download } from "wcf-component-lib/node_modules/iconoir-react";

export default function UploadDoctor() {
	return (
		<div className="flex flex-col p-6 bg-white rounded-lg">
			<div className="flex justify-between items-center mb-[20px]">
				<div className="flex flex-col">
					<p className="tablnact">อัพโหลดไฟล์</p>
					<p className="text-label text-[#779097]">ไฟล์ที่รองรับ .xls , .csv</p>
				</div>
				<a href="https://api-dev-wcf.soilfish.co/mw/api/asset/images/doctor_data_import_template_full.xlsx">
					<BaseButton
						className="w-fit px-4 py-2"
						label="ดาวน์โหลด Template"
						type="outline"
						size="large"
						icon={<Download />}
					/>
				</a>
			</div>
			<BaseUploadDragger
				onChangeFunction={() => {}}
				uploadUrl={""}
				bearer={""}
				antUploadDragIcon={<InboxOutlined className="" />}
				antUploadText="ลากหรือคลิกเพื่ออัปโหลด"
				antUploadHint={
					<>
						Strictly prohibit from uploading company data or other band files.
						<br />
						Support for a single or bulk upload.
					</>
				}
			/>
		</div>
	);
}
