"use client";

import {
	ArrowDownOutlined,
	ArrowUpOutlined,
} from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons";
import { toggleSortIcon } from "./service";
import { handleOrderBy } from "@/utils";
import {
	ColumnType,
	SortOrder,
} from "wcf-component-lib/node_modules/antd/es/table/interface";

interface Props {
	label: string;
	headerKey: string;
	columnKey: string;
	sort: { column: ColumnType<any>; order: SortOrder }[] | undefined;
}

const SortIconStatus = (props: Props) => {
	const { label, headerKey, columnKey, sort } = props;

	return (
		<div key={headerKey} className="flex space-x-2">
			<p className={sort?.[0]?.order ? "text-blue-500" : ""}>{label}</p>
			<div className="flex space-x-2">
				<ArrowUpOutlined
					className={`${toggleSortIcon(
						handleOrderBy(sort?.[0]?.order ?? ""),
						headerKey,
						columnKey,
						"ASC"
					)}`}
				/>
				<ArrowDownOutlined
					className={`${toggleSortIcon(
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

const CustomHeaderSort = (props: Props) => {
	return <SortIconStatus {...props} />;
};

export default CustomHeaderSort;
