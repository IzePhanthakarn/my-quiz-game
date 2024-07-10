export interface Login {
	username: string;
	password: string;
	grant_type: string;
}

export const modelLogin: Login = {
	username: "",
	password: "",
	grant_type: "password",
};
