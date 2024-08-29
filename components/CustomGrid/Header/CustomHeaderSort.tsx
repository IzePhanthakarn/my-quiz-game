"use client";

import {
	ArrowDownOutlined,
	ArrowUpOutlined,
} from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons";
import { toggleSortColor, toggleTitleColor } from "./service";
import { handleOrderBy } from "@/utils";
import {
	ColumnType,
	SortOrder,
} from "wcf-component-lib/node_modules/antd/es/table/interface";

// import "wcf-component-lib/src/scss/variable.scss";

interface Props {
	label: string;
	headerKey: string;
	columnKey: any;
	sort: { column: ColumnType<any>; order: SortOrder }[] | undefined;
}

const CustomHeaderSort = (props: Props) => {
	const { label, headerKey, columnKey, sort } = props;
	return (
		<div key={headerKey} className="flex space-x-2 ">
			<p
				className={`${toggleTitleColor(
					handleOrderBy(sort?.[0]?.order ?? ""),
					headerKey,
					columnKey
				)}`}
			>
				{label}
			</p>
			<div className="flex space-x-2">
				<ArrowUpOutlined
					className={`${toggleSortColor(
						handleOrderBy(sort?.[0]?.order ?? ""),
						headerKey,
						columnKey,
						"ASC"
					)}`}
				/>
				<ArrowDownOutlined
					className={`${toggleSortColor(
						handleOrderBy(sort?.[0]?.order ?? ""),
						headerKey,
						columnKey,
						"DESC"
					)}`}
				/>
			</div>
		</div>
	);
};

export default CustomHeaderSort;
