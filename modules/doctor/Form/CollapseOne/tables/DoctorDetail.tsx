import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns } from "../model/DoctorDetailModel";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setDialog } from "@/redux/slices/dialog";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import Form from "wcf-component-lib/node_modules/antd/es/form";

export default function DoctorDetails() {
	const dispatch: AppDispatch = useDispatch();
	const { grid, dialog } = useSelector(
		(state: SliceModel) => ({
			grid: state.doctor.doctorForm.doctorDetail,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	const [form] = Form.useForm();

	const dialogContent = () => {
		return (
			<div className="flex flex-col w-full">
				<p className="text-2xl">บันทึกข้อมูลวุฒิบัตรเฉพาะทาง</p>
				<BaseForm extraForm={form}>
					<div className="w-full">
						<BaseDropDown
							label="วุฒิบัตรเฉพาะทาง"
							itemName="diploma"
							type="diploma"
							getValue={(e) => {
								console.log("adas", e);
							}}
						/>
					</div>
					<BaseButton
						onClick={() => {
							console.log("asd", form.getFieldsValue());
						}}
						label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
					/>
				</BaseForm>
			</div>
		);
	};

	let rows;
	useEffect(() => {
		rows = () => {
			grid.map((item, index) => {
				return { ...item, id: index };
			});
		};
	}, []);

	return (
		<div className="space-y-2 flex flex-col">
			<BaseButton
				onClick={() =>
					dispatch(
						setDialog({
							...dialog,
							isOpen: true,
							uniqueContent: dialogContent(),
						})
					)
				}
				className="self-end"
				label="เพิ่มข้อมูลวุฒิบัตรเฉพาะทาง"
			/>
			<BaseGrid rows={rows} columns={columns} />
		</div>
	);
}
