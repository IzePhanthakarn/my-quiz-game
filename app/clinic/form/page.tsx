// import React from "react";
// import ClinicFormAdd from "../../../modules/clinic/clinicFormAdd";

// const ClinicFormAddPage = () => {
// 	return <ClinicFormAdd />;
// };

// export default ClinicFormAddPage;

import React from "react";
import { NextPage } from "next";
import ClinicFormEdit from "../../../modules/clinic/clinicFormEdit";

const ClinicFormPage: NextPage<ClinicFormPageProps> = ({ params }) => {
	return <ClinicFormEdit params={params} />;
};

export default ClinicFormPage;
