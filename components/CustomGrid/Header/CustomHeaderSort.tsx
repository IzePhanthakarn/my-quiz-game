import { SliceModel } from "@/redux/slices/model";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
} from "@ant-design/icons/lib/icons";
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { toggleSortIcon } from "./service";

interface Props {
	label: string;
	headerKey: string;
	columnKey: string;
}

const SortIconStatus = (props: Props) => {
	const { label, headerKey, columnKey } = props;
	const { page } = useSelector(
		(state: SliceModel) => ({
			page: state.clinic.grid.page,
		}),
		shallowEqual
	);

	useEffect(() => {}, [page.orders]);

	return (
		<div key={headerKey} className="flex space-x-2">
			<p>{label}</p>
			<div className="flex space-x-2">
				<ArrowUpOutlined
					className={`${toggleSortIcon(
						page.orders?.[0]?.direction ?? "",
						headerKey,
						columnKey,
						"ASC"
					)}`}
				/>
				<ArrowDownOutlined
					className={`${toggleSortIcon(
						page.orders?.[0]?.direction ?? "",
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
