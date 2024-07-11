import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";

export async function middleware(request: NextRequest) {
	const referer = request.headers.get("referer");
	const url = new URL(request.url);

	if (!referer) {
		const subpath = url.pathname;

		const apiResponse = await fetch(
			`${process.env.GET_PAGE_ACCESSES_PATH}/sjittikhun/page-accesses`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!apiResponse.ok) {
			return new NextResponse("Error fetching data", {
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

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!login).*)"],
};
