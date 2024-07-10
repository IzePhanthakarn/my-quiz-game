import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";

export async function middleware(request: NextRequest) {
	const referer = request.headers.get("referer");

	if (!referer) {
		const url = new URL(request.url);
		const subpath = url.pathname;

		const apiResponse = await fetch(
			"https://api-dev-wcf.soilfish.co/ums/users/sjittikhun/page-accesses",
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
		// console.log("Payload:", payload);

		const allPaths = _.flatMap(payload, (module) =>
			_.flatMap(module.subModules, (subModule) =>
				_.map(subModule.pages, "path")
			)
		);

		console.log(allPaths);

		if (!_.includes(allPaths, subpath)) {
			// return NextResponse.error();
			// return new NextResponse("Forbidden", { status: 403 });
		}

		// const tryy = _.flatMap(dataFromApi);
		// console.log("🚀 ~ middleware ~ tryy:", tryy);
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/:path*",
};
