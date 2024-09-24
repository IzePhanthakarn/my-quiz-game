export interface Med5005Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5005List {
	propertyCode: string;
}

export interface Med5005 {
	form: Med5005Form;
	list: Med5005List[];
}

export const modelMed5005: Med5005 = {
	form: {
		fromDate: null,
		toDate: null,
	},
	list: [],
};
