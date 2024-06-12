import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function FileSettingBtn(props: PropsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="small"
        sx={{
          position: "absolute",
          top: "5%",
          right: "5%",
          background: "#d3d3d3b8",
          color: "#000",
        }}
        onClick={handleClick}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            variant="text"
            startIcon={<EditOutlinedIcon />}
            onClick={(e) => {
              handleClose();
              props.handleEdit();
            }}
          >
            تعديل
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => {
              handleClose();
              props.handleDeleteFile();
            }}
          >
            حذف
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}

type PropsType = {
  handleDeleteFile: () => void;
  handleEdit: () => void;
};
