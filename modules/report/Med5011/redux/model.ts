export interface Med5011Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5011List {
	propertyCode: string;
}

export interface Med5011 {
	form: Med5011Form;
	list: Med5011List[];
}

export const modelMed5011: Med5011 = {
	form: {
		fromDate: null,
		toDate: null,
	},
	list: [],
};
