import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";
import { jwtDecode, JwtPayload } from "jwt-decode";

export async function middleware(request: NextRequest) {
	const referer = request.headers.get("referer");
	const url = new URL(request.url);

	const response = NextResponse.next();

	// const token =
	// 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhcHAxIiwic3ViIjoic2ppdHRpa2h1biIsInVzZXJJbmZvIjp7ImxvZ2luIjoic2ppdHRpa2h1biIsImZpcnN0TmFtZSI6IuC4iOC4tOC4leC4leC4tOC4hOC4uOC4kyIsImxhc3ROYW1lIjoi4Lio4Lij4Li14Liq4Li44LiCIiwiZW1haWwiOiJqaXR0aWtodW4uakBzc28uZ28udGgiLCJzc29CcmFuY2hDb2RlIjoiMTA1MCIsInRpdGxlIjoi4LiZ4Liy4LiiIiwiYWN0aXZlIjoiWSJ9LCJyb2xlcyI6W10sInNjb3BlIjpbXSwiaXNzIjoiaHR0cHM6Ly9hcGktZGV2LXdjZi5zb2lsZmlzaC5jby9hdXRoIiwiZXhwIjoxNzIwNzYzOTU2LCJpYXQiOjE3MjA2Nzc1NTZ9.aeLSPVXGhyHnnW51IZjuZR8Ko60ENxKpO39lNrcPcLiyHj76CSoa2XAD0zPkrYxULoj29Ie-NscD-IDqhshw1DSpzKXNv3CAwFrVLR5tc1PcfHjZ2Ff5wQ6BavO0twupJP2biwueZ7vV33aCt3A_nKticRMhmLSSmq_XWgbjTMlz7qkYI3v7uQuXKM2yHMBXyer6S4phz-sT83zEyf2FW-fnXZbge3SM4EzFDb8AEO3i4_1WRjS_vvzmUwu5tdYAwa5WJx9p83lwKN0j3YMqKAGcmqfwqVrdqhz1lGs5dm_8EFO42Mu3ZK4SfYEPF2eZxtdZvQEcyIQm2xzgEcM-Zw";
	const token = request.cookies.get("bearer")?.value; // Get the token from cookies
	// console.log("🚀 ~ middleware ~ token:", token);
	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	// response.cookies.set("bearer", token, {
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === "production",
	// 	sameSite: "strict",
	// 	path: "/",
	// });

	const decoded = jwtDecode<JwtPayload>(token);
	// console.log("🚀 ~ middleware ~ decoded:", _.get(decoded, "userInfo.login"));
	// console.log("🚀 ~ middleware ~ decoded:", decoded);

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

	return response;
}

export const config = {
	matcher: ["/((?!login).*)"],
};
