import { STATUS } from "./model";
interface Props {
	status: string;
}

const StatusIndicator = ({ status }: Props) => {
	return (
		<div
			className={`flex w-[120px] px-2 h-8 rounded-full items-center space-x-1 ${
				status === STATUS.ACTIVE ? "bg-green-200" : "bg-red-200"
			}`}
		>
			<div
				className={`w-2 h-2 rounded-full
      ${status === STATUS.ACTIVE ? "bg-green-500" : "bg-red-500"}`}
			></div>
			<p>{status === STATUS.ACTIVE ? "ใช้งาน" : "ไม่ใช้งาน"}</p>
		</div>
	);
};

export default StatusIndicator;
