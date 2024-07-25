"use server";

import { cookies } from "next/headers";

export const setCookie = (
	key: string,
	value: string,
	day = 24 * 60 * 60 * 1000
) => {
	cookies().set(key, value, { expires: new Date(Date.now() + day) });
};
