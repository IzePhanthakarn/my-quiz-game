// import React from "react";
// import ClinicFormAdd from "../../../modules/clinic/clinicFormAdd";

// const ClinicFormAddPage = () => {
// 	return <ClinicFormAdd />;
// };

// export default ClinicFormAddPage;

import React from "react";
import { NextPage } from "next";
import Form from "../../../../modules/course/sub-module/manipulate/Form";

const ClinicFormPage: NextPage<CourseCategoryFormPageProps> = ({ params }) => {
	return <Form params={params} />;
};

export default ClinicFormPage;
