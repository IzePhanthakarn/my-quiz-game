// components/GetOrigin.tsx
import { headers } from "next/headers";

export const GetOrigin = () => {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto") || "http";
	const origin = `${protocol}://${host}`;

	return origin;
};
