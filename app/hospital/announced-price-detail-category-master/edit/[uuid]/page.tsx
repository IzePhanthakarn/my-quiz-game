import React from "react";
import { NextPage } from "next";
import Form from "@/modules/hospital/announced-price-detail-category-master/Form";

const HospitalAnnouncedPriceDetailCategoryMasterFormPage: NextPage<
	HospitalAnnouncedPriceDetailCategoryMasterFormPageProps
> = ({ params }) => {
	return <Form params={params} />;
};

export default HospitalAnnouncedPriceDetailCategoryMasterFormPage;
