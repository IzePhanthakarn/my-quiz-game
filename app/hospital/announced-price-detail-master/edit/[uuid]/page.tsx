import React from "react";
import { NextPage } from "next";
import Form from "@/modules/hospital/announced-price-detail-master/Form";

const HospitalAnnouncedPriceDetailMasterFormPage: NextPage<
	HospitalAnnouncedPriceDetailMasterFormPageProps
> = ({ params }) => {
	return <Form params={params} />;
};

export default HospitalAnnouncedPriceDetailMasterFormPage;
