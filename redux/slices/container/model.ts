export interface Container {
	isLoading: boolean;
	uuid: string;
	mounted: string;
}

export const modelContainer: Container = {
	isLoading: false,
	uuid: "",
	mounted: "",
};
