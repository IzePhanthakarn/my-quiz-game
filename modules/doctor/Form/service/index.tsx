import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import { setCompareParams, setDoctorCompareList } from "../../redux";
import HistoryDialog from "../History/HistoryDialog";
import { DoctorForm } from "../../redux/form/model";
import CompareAllDialog from "../History/CompareAllDialog";
import _ from "lodash";
import { BaseSubmitButton } from "wcf-component-lib/src/components";
import WhiteBarLayout from "wcf-component-lib/src/layout/WhiteBarLayout";
import Tag from "wcf-component-lib/node_modules/antd/es/tag";
import ClockCircleOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ClockCircleOutlined";

export const handleOpenHistory =
	(doctorForm: DoctorForm) => async (dispatch: AppDispatch) => {
		dispatch(
			setCompareParams({
				olderVersion: doctorForm.editTimes[doctorForm.editTimes.length - 2],
				newerVersion: doctorForm.editTimes[doctorForm.editTimes.length - 1],
				doctorCode: doctorForm.doctorData.doctorCode,
			})
		);
		dispatch(setDoctorCompareList({ doctor: [], doctorAddress: [] }));
		dispatch(
			setDialog({
				isOpen: true,
				isOverFlow: true,
				uniqueContent: <HistoryDialog />,
			})
		);
	};

export const handleOpenHistoryAll = () => async (dispatch: AppDispatch) => {
	dispatch(
		setDialog({
			isOpen: true,
			isOverFlow: true,
			uniqueContent: <CompareAllDialog />,
		})
	);
};

export const handleWhiteBarLayout = (
	doctorForm: DoctorForm,
	dispatch: AppDispatch
) => {
	const editTimes = doctorForm.editTimes.length;
	const courseCategory = doctorForm.doctorData.courseCategory;
	const organSystemCourseWithWpi =
		doctorForm.doctorData.organSystemCourseWithWpi;
	const organSystemNoELearning = doctorForm.doctorData.doctorCode.slice(5, 7);

	let historyButton = null;
	let oraganTags = null;

	if (editTimes > 1) {
		historyButton = (
			// <div className="w-full flex justify-end">
			<BaseSubmitButton
				className="text-base font-semibold self-end"
				label="ประวัติการแก้ไข"
				onClickFunction={() => {
					// dispatch(handleOpenHistory(doctorForm));
					dispatch(handleOpenHistoryAll());
				}}
				icon={<ClockCircleOutlined />}
				customStyle={{
					width: "175px",
					height: "48px",
					borderRadius: "99px",
				}}
			/>
			// </div>
		);
	}

	if (!_.isEmpty(organSystemCourseWithWpi)) {
		if (courseCategory === "E") {
			oraganTags = (
				<div className="divTagDoctor">
					{organSystemCourseWithWpi
						.filter((e) => e.organSystemNo === organSystemNoELearning)
						.map((e, index) => {
							return (
								<Tag key={index} color="green">
									{e.description}
								</Tag>
							);
						})}
				</div>
			);
		} else if (courseCategory === "F") {
			oraganTags = (
				<div className="divTagDoctor">
					<Tag color="green">สามารถตรวจได้ทุกระบบ</Tag>
				</div>
			);
		} else {
			oraganTags = (
				<div className="divTagDoctor">
					{organSystemCourseWithWpi.map((e, index) => {
						const colors = ["green", "cyan", "blue"];
						const color = colors[index % colors.length];

						return (
							<Tag key={index} color={color}>
								{e.description}
							</Tag>
						);
					})}
				</div>
			);
		}
	}

	if (editTimes > 1 || !_.isEmpty(organSystemCourseWithWpi)) {
		return (
			<WhiteBarLayout
				className={`w-full items-center space-x-4 ${
					_.isNull(oraganTags) ? "justify-end" : "justify-between"
				}`}
			>
				{oraganTags}
				{historyButton}
			</WhiteBarLayout>
		);
	}
};
