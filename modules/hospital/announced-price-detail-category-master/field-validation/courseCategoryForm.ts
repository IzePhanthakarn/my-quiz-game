import {
	requiredRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { hospitalAnnouncedPriceDetailCategoryMasterName } from "../interfaces/name";

export const hospitalAnnouncedPriceDetailCategoryMasterRules = {
	categoryCodeSchema: [
		requiredRule(hospitalAnnouncedPriceDetailCategoryMasterName.categoryCode),
		maxRule(hospitalAnnouncedPriceDetailCategoryMasterName.categoryCode, 20),
	],
	categoryNameSchema: [
		requiredRule(hospitalAnnouncedPriceDetailCategoryMasterName.categoryName),
		maxRule(hospitalAnnouncedPriceDetailCategoryMasterName.categoryName, 50),
	],
};
