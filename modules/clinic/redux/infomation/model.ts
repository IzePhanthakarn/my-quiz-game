export interface ClinicForm {
  clinicCode: string;
  clinicName: string;
}

interface Grid extends ClinicForm {
  id: string;
}
export interface ClinicGrid {
  grid: Grid[];
}

export const modelClinicForm: ClinicForm = {
  clinicCode: "888",
  clinicName: "ไนกี้คลีนิก",
};
