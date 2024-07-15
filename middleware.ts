import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";
import { jwtDecode, JwtPayload } from "jwt-decode";

export async function middleware(request: NextRequest) {
	const referer = request.headers.get("referer");
	const url = new URL(request.url);
	const response = NextResponse.next();
	const token = request.cookies.get("Bearer")?.value; // Get the token from cookies
	if (_.isUndefined(token)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// response.cookies.set("Bearer", token, {
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === "production",
	// 	sameSite: "strict",
	// 	path: "/",
	// });

	const decoded = jwtDecode<JwtPayload>(token);
	// response.cookies.delete("Bearer");
	// console.log(
	// 	"🚀 ~ middleware ~ decoded:",
	// 	request.cookies.get("Bearer")?.value
	// );
	// response.cookies.set("Bearer", "", { path: "/", expires: new Date(0) });
	// console.log("🚀 ~ middleware ~ decoded:", decoded.exp);
	// console.log("🚀 ~ middleware ~ decoded:", _.get(decoded, "userInfo.login"));
	// console.log("🚀 ~ middleware ~ decoded:", decoded);
	const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp
	if (decoded.exp && decoded.exp < currentTime) {
		// Redirect to login page if token is expired
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (!referer) {
		const subpath = url.pathname;

		const apiResponse = await fetch(
			`${process.env.GET_PAGE_ACCESSES_PATH}/${_.get(
				decoded,
				"userInfo.login"
			)}/page-accesses`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!apiResponse.ok) {
			return new NextResponse("Error fetching page-accesses data", {
				status: apiResponse.status,
			});
		}
		const payload = await apiResponse.json();

		const allPaths = _.flatMap(payload, (module) =>
			_.flatMap(module.subModules, (subModule) =>
				_.map(subModule.pages, "path")
			)
		);

		// console.log(allPaths);
		// console.log(subpath);

		if (!_.includes(allPaths, subpath)) {
			// return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	// Check for the query parameter indicating client-side navigation
	// console.log(
	// 	"🚀 ~ middleware ~ tryy:",
	// 	url.protocol,
	// 	referer,
	// 	referer?.startsWith(`${request.headers.get("host")}`),
	// 	`${request.headers.get("host")}`
	// );

	// const isClientRedirect =
	// 	referer &&
	// 	referer.startsWith(url.protocol + "//" + request.headers.get("host")!) && // Ensure referer starts with host (your app's origin)
	// 	!referer.includes("_next/static/"); // Exclude requests for internal resources
	// if (isClientRedirect) {
	// 	console.log("🚀 ~ m", referer);
	// }
	return response;
}

export const config = {
	// matcher: ["/((?!login).*)"],

	matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
