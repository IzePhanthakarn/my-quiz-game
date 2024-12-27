import React from "react";
import {
	ItemByUserLogin,
	TooltipUser,
} from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/TooltipUser";

export default function index() {
	return (
		<TooltipUser
			name={""}
			listByUserLogin={[]}
			item={{
				displayName: "",
				employeeType: "",
				ssoBranchCode: "",
				workingDeptDescription: "",
			}}
			getSsoOfficerById={function (userLogin: string): Promise<void> {
				throw new Error("Function not implemented.");
			}}
			setItemByUserLogin={function (item: ItemByUserLogin): void {
				throw new Error("Function not implemented.");
			}}
		/>
	);
}
