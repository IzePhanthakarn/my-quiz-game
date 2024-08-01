export interface ScopesPermissions {
	read: string | null;
	write: string | null;
}

export interface NameFilter {
	checkFirstName: boolean;
	checkLastName: boolean;
	firstnameLike: string;
	lastnameLike: string;
}
