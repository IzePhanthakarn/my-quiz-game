import React from "react";
import { NextPage } from "next";
import Form from "@/modules/course-organ-system-group/Form";

const CourseCertificateFormPage: NextPage<CourseCertificateFormPageProps> = ({
	params,
}) => {
	return <Form params={params} />;
};

export default CourseCertificateFormPage;
