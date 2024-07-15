import React from "react";
import { NextPage } from "next";
import Form from "@/modules/course-category/Form";

const CourseCategoryFormPage: NextPage<CourseCategoryFormPageProps> = ({
	params,
}) => {
	return <Form params={params} />;
};

export default CourseCategoryFormPage;
