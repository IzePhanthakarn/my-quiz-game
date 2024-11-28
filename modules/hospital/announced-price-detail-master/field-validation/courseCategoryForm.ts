import {
	requiredRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { hospitalAnnouncedPriceDetailMasterName } from "../interfaces/name";

export const hospitalAnnouncedPriceDetailMasterRules = {
	nameSchema: [
		requiredRule(hospitalAnnouncedPriceDetailMasterName.name),
		maxRule(hospitalAnnouncedPriceDetailMasterName.name, 20),
	],
	unitNameSchema: [
		requiredRule(hospitalAnnouncedPriceDetailMasterName.unitName),
		maxRule(hospitalAnnouncedPriceDetailMasterName.unitName, 50),
	],
	runningCodeSchema: [
		requiredRule(hospitalAnnouncedPriceDetailMasterName.runningCode),
		maxRule(hospitalAnnouncedPriceDetailMasterName.runningCode, 20),
	],
	hospitalAnnouncedPriceDetailCategoryMasterUuidSchema: [
		requiredRule(
			hospitalAnnouncedPriceDetailMasterName.hospitalAnnouncedPriceDetailCategoryMasterUuid
		),
	],
};
