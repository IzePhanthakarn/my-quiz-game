export interface Med5009Form {
	propertyCode: string | null;
}

export interface Med5009List {
	propertyCode: string;
}

export interface Med5009 {
	form: Med5009Form;
	list: Med5009List[];
}

export const modelMed5009: Med5009 = {
	form: {
		propertyCode: null,
	},
	list: [],
};
