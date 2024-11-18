export const handleDoctorCode = (
	doctorCode: string,
	courseCategory: string | null
) => {
	let tmpDoctorCode = doctorCode;

	if (
		tmpDoctorCode.startsWith("E") ||
		tmpDoctorCode.startsWith("R") ||
		tmpDoctorCode.startsWith("S")
	) {
		tmpDoctorCode = tmpDoctorCode.slice(1);
	}

	if (courseCategory === "F") {
		return tmpDoctorCode;
	} else {
		return `${courseCategory}${tmpDoctorCode}`;
	}
};
