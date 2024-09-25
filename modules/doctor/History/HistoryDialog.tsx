import React, { useEffect } from "react";
import { CompareList } from "../redux/history/model";
import { ColumnsType } from "wcf-component-lib/node_modules/antd/lib/table";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initDoctorCompareHistory } from "./service";
import { SliceModel } from "@/redux/slices/model";
import { columns } from "./model";

// export interface Props {
// 	historyList: {
// 		header: string;
// 		gridCompare: { column: ColumnsType<any> | undefined; row: CompareList[] }[];
// 	};
// }

export default function HistoryDialog() {
	const dispatch: AppDispatch = useDispatch();
	const { compareList, filterList } = useSelector(
		(state: SliceModel) => ({
			compareList: state.doctor.doctorCompareHistory.compareList,
			filterList: state.doctor.doctorCompareHistory.filterList,
		}),
		shallowEqual
	);
	// const { historyList } = props;

	useEffect(() => {
		dispatch(
			initDoctorCompareHistory({ edit1: 1, edit2: 2, doctorCode: "5901019" })
		);
	}, []);
	return (
		<div className="w-full space-y-4 h-screen flex flex-col overflow-y-scroll">
			<BaseGrid
				rows={compareList.doctor}
				columns={columns}
				twoToneColor
				hideHeader
			/>
			<p>----</p>
			<BaseGrid
				rows={compareList.doctorAddress}
				columns={columns}
				twoToneColor
				hideHeader
			/>

			{/* {historyList.gridCompare.map((item, index) => (
				<div key={index}>
					<BaseGrid columns={item.column} rows={item.row} />
				</div>
			))} */}
		</div>
	);
}
