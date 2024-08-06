import { DiplomaForm } from "../model";
import { baseMasterDataModel } from "wcf-component-lib/src/interfaces/base-master-data-interface";

export const modelDiaplomaDetail: DiplomaForm = {
	...baseMasterDataModel,
	diplomaType: "",
	diplomaName: "",
};
