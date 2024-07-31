const SORT_COLOR = "text-[#FBC108]";

export function toggleSortColor(
	orders: string | undefined,
	headerKey: string,
	columnKey: string,
	directions: string
): string {
	const isUnique = columnKey === headerKey;
	return orders === directions && isUnique ? SORT_COLOR : "";
}

export function toggleTitleColor(
	orders: string | undefined,
	headerKey: string,
	columnKey: string
): string {
	const isUnique = columnKey === headerKey;
	return orders && isUnique ? SORT_COLOR : "";
}
