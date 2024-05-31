import CustomCellStatus from "@/components/CustomGridCell/CustomCellStatus";
import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE, STATUS } from "@/components/CustomGridCell/model";
import { getStatusBgColor } from "@/components/CustomGridCell/service";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";

export const columns: GridColDef[] = [
  { field: "clinicName", headerName: "ชื่อคลีนิก", width: 400 },
  {
    field: "clinicCode",
    headerName: "ทดสอบ",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      const prop = {
        status: STATUS.SUCCESS,
        label: params.value,
      };
      return <CustomCellStatus {...prop} />;
    },
  },
  {
    field: "a",
    headerName: "asd",
    width: 200,
    renderCell: () => {
      return <CustomCellButton mode={BUTTON_MODE.VIEW_ONLY} />;
    },
  },
];
