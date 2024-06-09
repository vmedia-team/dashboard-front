import { Button, Checkbox, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";
import ConfirmDeleteDirectory from "./ConfirmMultiDeleteDialog";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Api } from "../../../../../constants";

export default function AggregationBtns() {
  // TODO::declare and define component state and variables
  const {
    mainPageItems,
    selectedDirectoriedIds,
    SelectAllDirectories,
    handleSetOpenEditDialog,
    openDeleteDialog,
    handleSetOpenDeleteDialog,
    deleteMultiDirectories,
  } = useContext(LibraryMainPageContext);
  const { enqueueSnackbar } = useSnackbar();

  // TODO::declare and define helper methods
  const handleDelete = () => {
    //check there are any not deletable directories?
    let deletedArr =
      selectedDirectoriedIds?.map((id) => {
        return mainPageItems.find((ele) => ele.id == id);
      }) ?? [];

    let len = deletedArr.length;

    for (let i = 0; i < len; i++) {
      if (deletedArr[i]?.is_deletable == 0) {
        enqueueSnackbar("هناك فولدرات لا يمكن حذفها", { variant: "error" });
        return;
      }

      console.log("deletedArr[i]?.files_count", deletedArr[i]?.files_count);
      if (deletedArr[i]?.files_count ?? 0 > 0) {
        handleSetOpenDeleteDialog(true);
        return;
      }
    }

    //delete
    axios
      .post(Api(`employee/library/folder/multi-delete`), {
        ids: selectedDirectoriedIds,
      })
      .then(() => {
        deleteMultiDirectories();
        enqueueSnackbar("تم الحذف بنجاح");
        handleSetOpenDeleteDialog(false);
      })
      .catch((err) => {
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      });
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
        spacing={1}
        width={"100%"}
        mt={7}
        mb={1}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Checkbox
            checked={
              selectedDirectoriedIds?.length == mainPageItems?.length &&
              mainPageItems?.length != 0
            }
            onChange={() => SelectAllDirectories()}
          />
          <Typography variant="body2" fontSize={15}>
            {selectedDirectoriedIds?.length == mainPageItems?.length &&
            mainPageItems?.length != 0
              ? "ازالة تحديد الكل"
              : "تحديد الكل"}
          </Typography>
        </Stack>
        <Button
          disabled={selectedDirectoriedIds?.length != 1}
          color="info"
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={() => handleSetOpenEditDialog(true)}
        >
          تعديل
        </Button>
        <Button
          disabled={selectedDirectoriedIds?.length == 0}
          color="error"
          variant="outlined"
          endIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          حذف
        </Button>
      </Stack>
      <ConfirmDeleteDirectory open={openDeleteDialog} />
    </>
  );
}
