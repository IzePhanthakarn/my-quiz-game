import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { getStatusBgColor } from "./service";
import { STATUS } from "./model";

interface Props {
  status: STATUS;
  label?: string;
}

const InputEditStatusCell = (props: Props) => {
  const { status, label } = props;
  return (
    <div className={`p-2 rounded-full ${getStatusBgColor(status)} text-white`}>
      {label}
    </div>
  );
};

const CustomCellStatus = (props: Props) => {
  return <InputEditStatusCell {...props} />;
};

export default CustomCellStatus;
