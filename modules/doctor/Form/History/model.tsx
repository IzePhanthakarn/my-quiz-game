"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { CompareAllList, DoctorCompareList } from "../../redux/history/model";
import { handleBgColorGrid } from "./service";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { LtPropertiesForm } from "@/modules/lt-properties/redux/model";
import lodash from "lodash";
import { findNameDisplay } from "@/components/MedDropDown/service";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { DiplomaForm } from "@/modules/diploma/redux/model";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "olderValue",
		key: "olderValue",
	},
	{
		title: "ลำดับ",
		dataIndex: "newerValue",
		width: "33.34%",
		key: "newerValue",
		render: (_, { newerValue, isChanged }) => {
			if (isChanged) {
				return {
					props: {
						style: { backgroundColor: isChanged ? "#FDE69C" : undefined },
					},
					children: newerValue,
				};
			} else {
				return {
					children: newerValue,
				};
			}
		},
	},
];

export const columnCompareAll: TableProps["columns"] = [
	{
		title: "ครั้งที่",
		width: "5%",
		dataIndex: "editTimes",
		key: "editTimes",
	},
	{
		title: "วันที่",
		width: "15%",
		dataIndex: "updatedDate",
		key: "updatedDate",
		render: (_, { updatedDate }) => {
			const updatedDateSplit = updatedDate.split("T");
			return <>{`${updatedDateSplit[0]} ${updatedDateSplit[1]}`}</>;
		},
	},
	{
		title: "ชื่อข้อมูล",
		width: "20%",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ข้อมูลก่อนแก้ไข",
		width: "20%",
		dataIndex: "olderValue",
		key: "olderValue",
		render: (_, { olderValue }) => {
			return <>{olderValue ?? "-"}</>;
		},
	},
	{
		title: "ข้อมูลหลังแก้ไข",
		width: "20%",
		dataIndex: "newerValue",
		key: "newerValue",
		render: (_, { newerValue }) => {
			return <>{newerValue ?? "-"}</>;
		},
	},
	{
		title: "ผู้แก้ไข",
		width: "20%",
		dataIndex: "updatedBy",
		key: "updatedBy",
	},
];

export const getItems = (compareList: DoctorCompareList) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "ข้อมูลแพทย์",
			children: (
				<BaseGrid
					rows={compareList.doctor}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "2",
			label: "ข้อมูลที่อยู่แพทย์",
			children: (
				<BaseGrid
					rows={compareList.doctorAddress}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "3",
			label: "สังกัดโรงพยาบาล",
			children: (
				<div className="w-full justify-between flex space-x-12 py-2 px-6">
					{/* old */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorHospitalHistoryCompare.olderGrid
						}
						columns={columnsDoctorHospital}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
					{/* new */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorHospitalHistoryCompare.newerGrid
						}
						columns={columnsDoctorHospital}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
				</div>
			),
		},
		{
			key: "4",
			label: "ข้อมูลวุฒิบัตรเฉพาะทาง",
			children: (
				<div className="w-full justify-between flex space-x-12 py-2 px-6">
					{/* old */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorDetailHistoryCompare.olderGrid
						}
						columns={columnsDoctorDetail}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
					{/* new */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorDetailHistoryCompare.newerGrid
						}
						columns={columnsDoctorDetail}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
				</div>
			),
		},
		{
			key: "5",
			label: "รายละเอียดการจ่าย",
			children: (
				<div className="w-full justify-between flex space-x-12 py-2 px-6">
					{/* old */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorBankHistoryCompare.olderGrid
						}
						columns={columnsDoctorBank}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
					{/* new */}
					<BaseGrid
						rows={
							compareList.relationHistory.doctorBankHistoryCompare.newerGrid
						}
						columns={columnsDoctorBank}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
				</div>
			),
		},
		{
			key: "6",
			label: "ข้อมูลการอบรม",
			children: (
				<div className="w-full justify-between flex space-x-12 py-2 px-6">
					{/* old */}
					<BaseGrid
						rows={compareList.relationHistory.trainingHistoryCompare.olderGrid}
						columns={columnsTraining}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
					{/* new */}
					<BaseGrid
						rows={compareList.relationHistory.trainingHistoryCompare.newerGrid}
						columns={columnsTraining}
						rowClassName={(record) => {
							return handleBgColorGrid(record);
						}}
					/>
				</div>
			),
		},
	];
	return items;
};

export const getItemsCompareAll = (compareAllList: CompareAllList[]) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "เปรียบเทียบข้อมูลทั้งหมด",
			children: (
				<BaseGrid
					rows={compareAllList}
					columns={columnCompareAll}
					twoToneColor
				/>
			),
		},
	];
	return items;
};

export const columnsDoctorDetail: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "วุฒิบัตรเฉพาะทาง",
		dataIndex: "diplomaType",
		key: "diplomaType",
	},
	{
		title: "วุฒิบัตรเฉพาะทาง",
		dataIndex: "diplomaName",
		key: "diplomaName",
		render: (_, { diplomaType }: any) => {
			const sessionDiploma = JSON.parse(
				sessionStorage.getItem(SESSION_NAME.DIPLOMA) ?? "[]"
			);
			return (
				<p>
					{sessionDiploma.find(
						(e: DiplomaForm) => e.diplomaType === diplomaType
					).diplomaName ?? ""}
				</p>
			);
		},
	},
];

export const columnsDoctorHospital: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "รหัสโรงพยาบาล",
		dataIndex: "hospitalWcfCode",
		key: "hospitalWcfCode",
	},
	{
		title: "ชื่อโรงพยาบาล",
		dataIndex: "hospitalWcfName",
		key: "hospitalWcfName",
	},
	{
		title: "ลักษณะงานที่รับผิดชอบ",
		dataIndex: "jobType",
		key: "jobType",
		render: (_: any, { jobType }: any) => {
			const sessionJobType = JSON.parse(
				sessionStorage.getItem(SESSION_NAME.JOB_TYPE) ?? "[]"
			);
			const data: LtPropertiesForm[] = sessionJobType.filter(
				(item: LtPropertiesForm) => item.propertyCode === jobType
			);
			return <p>{data[0]?.propertyText ?? ""}</p>;
		},
	},
	{
		title: "ตำแหน่ง",
		dataIndex: "position",
		key: "position",
	},
];

export const columnsDoctorBank: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "ชื่อธนาคาร",
		dataIndex: "bankDigitCode",
		key: "bankDigitCode",
		render: (_: any, { bankDigitCode }: any) => {
			const bankDisplay = findNameDisplay(SESSION_NAME.BANK, bankDigitCode);
			return <p>{bankDisplay}</p>;
		},
	},
	{
		title: "สาขาธนาคาร",
		dataIndex: "bankSortingCode",
		key: "bankSortingCode",
		render: (_: any, { bankSortingCode }: any) => {
			const bankBranchDisplay = findNameDisplay(
				SESSION_NAME.BANK_BRANCH,
				bankSortingCode
			);
			return <p>{bankBranchDisplay}</p>;
		},
	},
	{
		title: "เลขที่บัญชี",
		dataIndex: "bankAccount",
		key: "bankAccount",
	},
	{
		title: "พร้อมเพย์",
		dataIndex: "promptpay",
		key: "promptpay",
	},
];

export const columnsTraining: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "รุ่นที่อบรม",
		dataIndex: "trainingNo",
		key: "trainingNo",
	},
	{
		title: "ปีที่อบรม",
		dataIndex: "trainingYear",
		key: "trainingYear",
	},
	{
		title: "วันที่อบรม",
		dataIndex: "trainingDate",
		key: "trainingDate",
		render: (_: any, { trainingDate }: any) => {
			const date = dayjs(trainingDate).format(DateFormat.DDMMYYYY);
			return <p>{date}</p>;
		},
	},
];
