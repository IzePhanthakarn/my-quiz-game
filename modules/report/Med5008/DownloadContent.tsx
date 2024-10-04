import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5008Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { handlePdfButton } from "./service";

interface Props {
	med5008: Med5008Form;
	form: FormInstance<Med5008Form>;
	onFinish: FormProps<Med5008Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5008, form, onFinish } = props;
	const dispatch: AppDispatch = useDispatch();
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5008, REPORT_TYPES.MED5008));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5008));
		}
		return e;
	}
	return (
		<BaseForm initialValues={med5008} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			   <div><BaseDatePicker label="วันที่สิ้นสุดใบอนุญาต(สพ.7)" itemName={"sp7expiredFrom"} /></div>
			   <div >
			   <BaseDatePicker label="ถึงวันที่" itemName={"sp7expiredTo"}/>
			   </div>
			</div>	
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			   <div><BaseDatePicker label="วันที่สิ้นสุดใบอนุญาต(สพ.19)" itemName={"sp19expiredFrom"} /></div>
			   <div >
			   <BaseDatePicker label="ถึงวันที่" itemName={"sp19expiredTo"}/>
			   </div>
			   {!_.isEmpty(med5008.showDownload) ? (
			    <div>
				 <MedDropDown label="ดาวน์โหลด" option={DROPDOWN_REPOT}  
				 getValue={(e: string) => {
						DownloadChange( e)
				}}
				 />
				</div>
			   ):null}	
			</div> 	 
		</BaseForm>
	);
}
