export function toggleSortIcon(
	orders: string | undefined,
	headerKey: string,
	columnKey: string,
	directions: string
) {
	const isUnique = columnKey === headerKey;
	if (orders === directions && isUnique) {
		return "text-blue-500";
	} else {
		return "";
	}
}
