import { OrganManipulate, modelOrganManipulate } from "./manipulate/model";

export interface Organ {
	manipulate: OrganManipulate;
}

export const modelOrgan: Organ = {
	manipulate: modelOrganManipulate,
};
