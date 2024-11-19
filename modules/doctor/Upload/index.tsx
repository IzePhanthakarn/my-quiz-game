"use client";

import React, { useEffect } from "react";
import BaseUploadDragger from "wcf-component-lib/src/components/BaseUploadDragger";
import InboxOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/InboxOutlined";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { FILE_TYPES } from "wcf-component-lib/src/constants/file-types";
import type { UploadFile } from "wcf-component-lib/node_modules/antd/es/upload/interface";
import _ from "lodash";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { handleXlsx, PreviewDoctorGrid } from "./service";
import { BaseColumn } from "wcf-component-lib/src/components";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns } from "./model";
import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";

export default function UploadDoctor() {
	const dispatch: AppDispatch = useDispatch();
	const [file, setFile] = React.useState<UploadFile<any>[]>([]);
	const [previewGrid, setPreviewGrid] = React.useState<PreviewDoctorGrid>({
		grid: [],
		page: modelPaginationOptions,
		errorList: [],
	});

	useEffect(() => {
		if (!_.isEmpty(file)) {
			dispatch(
				handleXlsx(
					{
						file,
						isPreview: true,
						page: previewGrid.page,
					},
					previewGrid,
					setPreviewGrid
				)
			);
		}
	}, [file, previewGrid.page.pageNumber, previewGrid.page.pageSize]);

	return (
		<BaseColumn className="space-y-4">
			<div className="flex flex-col p-6 bg-white rounded-lg">
				<div className="flex justify-between items-center mb-[20px]">
					<div className="flex flex-col">
						<p className="tablnact">อัปโหลดไฟล์</p>
						<p className="text-label text-[#779097]">ไฟล์ที่รองรับ .xlsx</p>
					</div>
					<a href="https://api-dev-wcf.soilfish.co/mw/api/asset/images/doctor_data_import_template_full.xlsx">
						<BaseButton
							label="ดาวน์โหลด Template"
							type="outline"
							size="large"
							iconType="download"
						/>
					</a>
				</div>
				<BaseUploadDragger
					allowFileTypesToUpload={[FILE_TYPES.XLSX]}
					onChangeFunction={(e) => {
						setFile(e);
					}}
					uploadUrl={""}
					bearer={""}
					antUploadDragIcon={<InboxOutlined className="" />}
					antUploadText="ลากหรือคลิกเพื่ออัปโหลด"
					antUploadHint={<>อัปโหลดได้เฉพาะไฟล์ .xlsx เท่านั้น</>}
				/>
			</div>
			{previewGrid.grid.length > 0 && (
				<div className="flex flex-col p-6 bg-white rounded-lg">
					<div className="flex justify-between items-center mb-4">
						<div className="flex flex-col">
							<p className="tablnact">ตัวอย่างข้อมูลที่ถูกนำเข้า</p>
							<p className="text-label text-[#779097]">
								ทั้งหมด {previewGrid.page.totalData} รายการ
							</p>
						</div>
						<BaseButton
							label="นำเข้าแพทย์"
							type="primary"
							size="large"
							iconType="import"
							onClick={() => {
								dispatch(
									handleXlsx(
										{
											file,
											isPreview: false,
											page: previewGrid.page,
										},
										previewGrid,
										setPreviewGrid
									)
								);
							}}
						/>
					</div>
					<BaseGrid
						rows={previewGrid.grid}
						columns={columns}
						page={previewGrid.page}
						setPagination={(page) => {
							setPreviewGrid({
								...previewGrid,
								page,
							});
						}}
					/>
				</div>
			)}
		</BaseColumn>
	);
}
