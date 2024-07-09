import _ from "wcf-component-lib/node_modules/@types/lodash/index";
import { setIsLoading } from "@/components/Loading/redux";
import { setOrganManipulateGrid } from "@/modules/organ/redux";
import { AppDispatch } from "@/redux/config/configStore";
import { GetOrganListBody, getOrganList } from "./api";
import { OrganManipulate } from "@/modules/organ/redux/manipulate/model";

export const fetchOrganList =
	(organ: OrganManipulate) => async (dispatch: AppDispatch) => {
		const body: GetOrganListBody = {
			systemId: "",
			organSystemNo: "",
			description: "",
			pagination: organ.grid.page,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(getOrganList(body));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setOrganManipulateGrid({
				data: result.payload.content,
				page: {
					...organ.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};
