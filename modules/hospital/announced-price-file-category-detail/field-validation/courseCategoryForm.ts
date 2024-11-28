import {
	requiredRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { hospitalAnnouncedPriceFileCategoryDetailName } from "../interfaces/name";

export const hospitalAnnouncedPriceFileCategoryDetailRules = {
	categoryCodeSchema: [
		requiredRule(hospitalAnnouncedPriceFileCategoryDetailName.categoryCode),
		maxRule(hospitalAnnouncedPriceFileCategoryDetailName.categoryCode, 20),
	],
	categoryNameSchema: [
		requiredRule(hospitalAnnouncedPriceFileCategoryDetailName.categoryName),
		maxRule(hospitalAnnouncedPriceFileCategoryDetailName.categoryName, 50),
	],
};
