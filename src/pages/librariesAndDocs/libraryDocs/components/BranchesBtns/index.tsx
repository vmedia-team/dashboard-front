import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddEditLibDocDialog from "../Dialog";
import { useContext, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import ChooseTypeDialog from "../ChooseTypeDialog";

export default function BranchesBtns() {
  // TODO::declare and define state and variables.
  const [openChooseTypeDialog, setOpenChooseTypeDialog] = useState(false);
  const { openDialog } = useContext(LibraryDocumentionContext);
  // TODO::declare and define helper method.
  const handleClick = () => {
    setOpenChooseTypeDialog(true);
    // handleOenDialog(true);
  };
  // TODO::return componsnt view.
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mt={3}
    >
      <Stack direction={"row"} spacing={2}>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            borderRadius: 0,
            bgcolor: "background.paper",
            color: "primary.main",
          }}
        >
          الكل
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          فرع مكة
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          فرع جدة
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          فرع الرياض
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            bgcolor: "none",
          }}
        >
          فرع القاهرة
        </Button>
      </Stack>
      {/* create documentation btn */}
      <Button
        variant="contained"
        startIcon={<AddBoxOutlinedIcon />}
        onClick={handleClick}
        sx={{
          fontWeight: 600,
          transition: "transform 0.2s ease-in-out",
          ":hover": {
            transform: "scale(1.0789)",
          },
        }}
      >
        أنشاء
      </Button>
      <ChooseTypeDialog
        open={openChooseTypeDialog}
        setOpen={setOpenChooseTypeDialog}
      />
      <AddEditLibDocDialog open={openDialog} />
    </Stack>
  );
}
