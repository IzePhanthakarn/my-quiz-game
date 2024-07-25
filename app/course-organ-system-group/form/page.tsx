import React from "react";
import { NextPage } from "next";
import Form from "@/modules/course-organ-system-group/Form";

const CourseOrganSystemGroupFormPage: NextPage<
	CourseOrganSystemGroupFormPageProps
> = ({ params }) => {
	return <Form params={params} />;
};

export default CourseOrganSystemGroupFormPage;
