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
import {
	handleGetTemplateDoctor,
	handleXlsx,
	PreviewDoctorGrid,
} from "./service";
import { BaseColumn } from "wcf-component-lib/src/components";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns, modelPreviewGrid } from "./model";
import { handleSession } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { setDialog } from "@/redux/slices/dialog";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
import { BaseDialog } from "@/redux/slices/dialog/model";
import ErrorModal from "./ErrorModal";

export default function UploadDoctor() {
	const dispatch: AppDispatch = useDispatch();
	const [file, setFile] = React.useState<UploadFile<any>[]>([]);
	const [handleDialog, setHandleDialog] = React.useState(false);
	const [previewGrid, setPreviewGrid] =
		React.useState<PreviewDoctorGrid>(modelPreviewGrid);
	const dialogFunction: BaseDialog = {
		labelConfirm: "ยืนยัน",
		isOpen: true,
		showCancel: true,
		headerText: "ยืนยันการนำเข้าข้อมูล",
		content: (
			<p className="text-label text-[#779097]">
				ข้อมูลรายชื่อแพทย์ {previewGrid.page.totalData} รายการ จะถูกเพิ่ม
			</p>
		),
		width: 620,
		baseDialogType: BaseDialogType.SUCCESS,
		themeIcon: "success",
		onConfirm: () => {
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
		},
	};

	useEffect(() => {
		dispatch(handleSession(SESSION_NAME.HOSPITAL));
		dispatch(handleSession(SESSION_NAME.ADDRESS));
	}, []);

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

	useEffect(() => {
		if (!_.isEmpty(file)) {
			setHandleDialog(false);
		}
	}, [file]);

	useEffect(() => {
		if (!_.isEmpty(previewGrid.errorList) && !handleDialog) {
			dispatch(
				setDialog({
					headerText: "รายการข้อมูลที่ผิดพลาด",
					content: <ErrorModal errorList={previewGrid.errorList} />,
					isOpen: true,
					isOverFlow: true,
					maxHeight: "60vh",
					maxWidth: "40vw",
					baseDialogType: BaseDialogType.DANGER,
				})
			);
			setHandleDialog(true);
		}
	}, [previewGrid.errorList]);

	return (
		<BaseColumn className="space-y-4">
			<div className="flex flex-col p-6 bg-white rounded-lg">
				<div className="flex justify-between items-center mb-[20px]">
					<div className="flex flex-col">
						<p className="tablnact">อัปโหลดไฟล์</p>
						<p className="text-label text-[#779097]">ไฟล์ที่รองรับ .xlsx</p>
					</div>
					<BaseButton
						label="ดาวน์โหลด Template"
						onClick={() => dispatch(handleGetTemplateDoctor())}
						type="outline"
						size="large"
						iconType="download"
					/>
				</div>
				<BaseUploadDragger
					allowFileTypesToUpload={[FILE_TYPES.XLSX]}
					onChangeFunction={(e) => {
						setFile(e);
					}}
					uploadUrl={""}
					bearer={""}
					originalFileName
					antUploadDragIcon={<InboxOutlined className="" />}
					antUploadText="ลากหรือคลิกเพื่ออัปโหลด"
					antUploadHint={<>อัปโหลดได้เฉพาะไฟล์ .xlsx เท่านั้น</>}
					fileTypeErrorText={`เนื่องจาก "format ไฟล์ไม่ตรงกับ template" กรุณาตรวจสอบไฟล์อีกครั้ง`}
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
								dispatch(setDialog(dialogFunction));
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
