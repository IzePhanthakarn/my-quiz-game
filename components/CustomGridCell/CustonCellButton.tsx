import { BUTTON_MODE } from "./model";
import Button from "@mui/material/Button";
import Row from "../Row";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
interface Props {
  mode: BUTTON_MODE;
}

const InputEditButtonCell = ({ mode }: Props) => {
  //   const apiRef = useGridApiContext();
  if (mode === BUTTON_MODE.VIEW_EDIT) {
    return (
      <Row className="items-center space-x-1">
        <Button className={`bg-[#2196F3] text-white`}>รายละเอียด</Button>
        <Button className={`bg-[#D32F2F] text-white`}>ลบ</Button>
      </Row>
    );
  } else if (mode === BUTTON_MODE.VIEW_ONLY) {
    return (
      <Row className="items-center">
        <Button className={`bg-[#2196F3] text-white`}>ดูรายละเอียด</Button>
      </Row>
    );
  } else if (mode === BUTTON_MODE.VIEW_EDIT_ICON) {
    return (
      <Row className="items-center space-x-1">
        <IconButton>
          <VisibilityIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Row>
    );
  }
};

const CustomCellButton = ({ mode }: Props) => {
  return <InputEditButtonCell mode={mode} />;
};

export default CustomCellButton;
