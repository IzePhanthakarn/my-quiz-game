import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Page = {
	path: string;
};

type SubModule = {
	pages: Page[];
};

type Module = {
	subModules: SubModule[];
};

const getNestedProperty = (obj: any, path: string) => {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export async function middleware(request: NextRequest) {
	// return NextResponse.next();
	// const referer = request.headers.get("referer");
	// const url = new URL(request.url);
	// const response = NextResponse.next();
	// const token = request.cookies.get("Bearer")?.value; // Get the token from cookies
	// if (typeof token === "undefined") {
	// 	return NextResponse.redirect(new URL("/login", request.url));
	// }
	// const decoded = jwtDecode<JwtPayload>(`${token}`);
	// const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp
	// if (decoded.exp && decoded.exp < currentTime) {
	// 	// Redirect to login page if token is expired
	// 	return NextResponse.redirect(new URL("/login", request.url));
	// }
	// // console.log("🚀 ~ middleware ~ referer:", referer);
	// if (!referer) {
	// 	const subpath = url.pathname;
	// 	const userInfoLogin = getNestedProperty(decoded, "userInfo.login");
	// 	const pageAccessPath = `${process.env.GET_PAGE_ACCESSES_PATH}/${userInfoLogin}/page-accesses`;
	// 	// console.log("🚀 ~ middleware ~ pageAccessPath:", pageAccessPath);
	// 	const apiResponse = await fetch(pageAccessPath, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// 	if (!apiResponse.ok) {
	// 		return new NextResponse("Error fetching page-accesses data", {
	// 			status: apiResponse.status,
	// 		});
	// 	}
	// 	const payload: Module[] = await apiResponse.json();
	// 	// const allPaths = flatMap(payload, (module) =>
	// 	// 	flatMap(module.subModules, (subModule) => map(subModule.pages, "path"))
	// 	// );
	// 	// const allPaths = payload.flatMap((module) =>
	// 	// 	module.subModules.flatMap((subModule) =>
	// 	// 		subModule.pages.map((page) => page.path)
	// 	// 	)
	// 	// );
	// 	const allPaths = payload.flatMap((module) =>
	// 		module.subModules.flatMap((subModule) =>
	// 			subModule.pages.map((page) => page.path)
	// 		)
	// 	);
	// 	// console.log(allPaths);
	// 	// console.log(subpath);
	// 	// if (!includes(allPaths, subpath)) {
	// 	// 	// return NextResponse.redirect(new URL("/login", request.url));
	// 	// }
	// 	if (!allPaths.includes(subpath)) {
	// 		// return NextResponse.redirect(new URL("/login", request.url));
	// 	}
	// }
	// // Check for the query parameter indicating client-side navigation
	// // console.log(
	// // 	"🚀 ~ middleware ~ tryy:",
	// // 	url.protocol,
	// // 	referer,
	// // 	referer?.startsWith(`${request.headers.get("host")}`),
	// // 	`${request.headers.get("host")}`
	// // );
	// // const isClientRedirect =
	// // 	referer &&
	// // 	referer.startsWith(url.protocol + "//" + request.headers.get("host")!) && // Ensure referer starts with host (your app's origin)
	// // 	!referer.includes("_next/static/"); // Exclude requests for internal resources
	// // if (isClientRedirect) {
	// // 	console.log("🚀 ~ m", referer);
	// // }
	// return response;
}

export const config = {
	// matcher: ["/((?!login).*)"],

	matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
