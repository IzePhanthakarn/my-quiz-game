"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LINKS } from "@/constants/links";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { useRouter } from "next/navigation";
import { GetColumns } from "./columns/grid";
import { fetchCourseList, handleDownloadTemplate } from "./service";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { hospitalAnnouncedPriceDetailMasterName } from "./interfaces/name";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_ISACTIVE } from "@/components/MedDropDown/model";
import { setHospitalAnnouncedPriceDetailMasterFilter } from "../redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import SearchOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/SearchOutlined";
import BaseSubmitButton from "wcf-component-lib/src/components/BaseSubmitButton/BaseSubmitButton";
import { Download } from "wcf-component-lib/node_modules/iconoir-react";

export default function HospitalAnnouncedPriceDetailMaster() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { HospitalAnnouncedPriceDetailMaster, isOpen, isLoading, filter } =
		useSelector(
			(state: SliceModel) => ({
				isOpen: state.drawer.isOpen,
				isLoading: state.container.isLoading,
				HospitalAnnouncedPriceDetailMaster:
					state.hospital.hospitalAnnouncedPriceDetailMaster,
				filter: state.hospital.hospitalAnnouncedPriceDetailMaster.filter,
			}),
			shallowEqual
		);

	useEffect(() => {
		dispatch(fetchCourseList(HospitalAnnouncedPriceDetailMaster));
	}, []);

	return (
		<div>
			<MasterDataLayout
				FilterLayout={
					<FilterLayout
						isFlex={false}
						isButtonCenter
						childrenRight={
							<>
								<BaseButton
									onClick={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
									icon={<SearchOutlined />}
									type="primary"
									label={"ค้นหา"}
									htmlType="submit"
								/>

								{/* <a
									href={`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/announcedPriceFileTemplate/template.xlsx`}
									// href={`https://api-dev-wcf.soilfish.co/mw/wcf2-public/hospital/announcedPriceFileTemplate/template.xlsx`}
								> */}
								<BaseSubmitButton
									type="outlined"
									className="text-base font-semibold mr-3"
									label="ดาวน์โหลดไฟล์ Template"
									onClickFunction={() => {
										dispatch(handleDownloadTemplate());
									}}
									icon={<Download />}
									customStyle={{
										// width: "175px",
										height: "48px",
										borderRadius: "99px",
									}}
								/>
								{/* </a> */}
							</>
						}
						FilterForm={
							<div className="flex space-x-2">
								<BaseItemInput
									notForm
									label={hospitalAnnouncedPriceDetailMasterName.name}
									itemName="nameLike"
									value={filter.nameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												nameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={hospitalAnnouncedPriceDetailMasterName.unitName}
									itemName="unitNameLike"
									value={filter.unitNameLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												unitNameLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
								/>
								<BaseItemInput
									notForm
									label={hospitalAnnouncedPriceDetailMasterName.runningCode}
									itemName="runningCodeLike"
									value={filter.runningCodeLike}
									onChangeFunction={(e) => {
										dispatch(
											setHospitalAnnouncedPriceDetailMasterFilter({
												...filter,
												runningCodeLike: e.target.value,
											})
										);
									}}
									onPressEnter={() => {
										dispatch(
											fetchCourseList(HospitalAnnouncedPriceDetailMaster)
										);
									}}
								/>
								<div className="w-[240px]">
									<MedDropDown
										notForm
										label="สถานะการใช้งาน"
										option={DROPDOWN_ISACTIVE}
										value={filter.isActive}
										itemName="isActive"
										getValue={(value) => {
											dispatch(
												setHospitalAnnouncedPriceDetailMasterFilter({
													...filter,
													isActive: value,
												})
											);
										}}
									/>
								</div>
							</div>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						// handleSubmitSearch={() => {
						// 	dispatch(fetchCourseList(HospitalAnnouncedPriceDetailMaster));
						// }}
					/>
				}
				AddLabel="เพิ่ม Master ราคาประกาศ"
				TotalItems={HospitalAnnouncedPriceDetailMaster.grid.page.totalData}
				Grid={
					<BaseGrid
						rows={HospitalAnnouncedPriceDetailMaster.grid.data}
						columns={GetColumns(router)}
						page={HospitalAnnouncedPriceDetailMaster.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								fetchCourseList({
									...HospitalAnnouncedPriceDetailMaster,
									grid: {
										...HospitalAnnouncedPriceDetailMaster.grid,
										page,
									},
								})
							);
						}}
					/>
				}
				AddFunction={() =>
					router.push(LINKS.HOSPITAL.hospitalAnnouncedPriceDetailMaster.add)
				}
			/>
		</div>
	);
}
