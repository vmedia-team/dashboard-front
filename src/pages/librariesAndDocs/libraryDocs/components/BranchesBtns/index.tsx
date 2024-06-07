import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddEditLibDocDialog from "../Dialog";
import { useContext } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";

export default function BranchesBtns() {
  // TODO::declare and define state and variables.
  const { openDialog, handleOenDialog } = useContext(LibraryDocumentionContext);
  // TODO::declare and define helper method.
  const handleClick = () => {
    handleOenDialog(true);
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
        }}
      >
        أنشاء
      </Button>
      <AddEditLibDocDialog open={openDialog} />
    </Stack>
  );
}
