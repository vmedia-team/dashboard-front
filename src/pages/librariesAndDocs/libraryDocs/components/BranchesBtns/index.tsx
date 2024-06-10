import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddEditLibDocDialog from "../Dialog";
import { useContext, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import ChooseTypeDialog from "../ChooseTypeDialog";
import NestedDirectoryDialog from "../NestedDirectories/Dialog";

export default function BranchesBtns() {
  // TODO::declare and define state and variables.
  const [openChooseTypeDialog, setOpenChooseTypeDialog] = useState(false);
  const {
    openDialog,
    NestedDirectoryOpenDialog,
    branchesData,
    activeBranchId,
    handleSetActiveBranchId,
  } = useContext(LibraryDocumentionContext);

  // TODO::declare and define helper method.
  const handleCreateClick = () => {
    setOpenChooseTypeDialog(true);
    // handleOenDialog(true);
  };
  const handleClickBranch = (id: number) => {
    handleSetActiveBranchId(id);
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
            bgcolor: -1 == activeBranchId ? "background.paper" : "none",
            color: -1 == activeBranchId ? "primary.main" : "text.secondary",
          }}
          onClick={() => handleClickBranch(-1)}
        >
          الكل
        </Button>
        {branchesData?.map((btn) => (
          <Button
            key={btn.id}
            variant="text"
            sx={{
              fontWeight: 600,
              bgcolor: btn.id == activeBranchId ? "background.paper" : "none",
              color:
                btn.id == activeBranchId ? "primary.main" : "text.secondary",
            }}
            onClick={() => handleClickBranch(btn.id)}
          >
            {btn.name}
          </Button>
        ))}
      </Stack>
      {/* create documentation btn */}
      <Button
        variant="contained"
        startIcon={<AddBoxOutlinedIcon />}
        onClick={handleCreateClick}
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
      <NestedDirectoryDialog open={NestedDirectoryOpenDialog} />
    </Stack>
  );
}
