import { Button, Checkbox, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";

export default function AggregationBtns() {
  // TODO::declare and define component state and variables
  const { mainPageItems, selectedDirectoriedIds, SelectAllDirectories } =
    useContext(LibraryMainPageContext);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"end"}
      spacing={1}
      width={"100%"}
      mt={7}
      mb={1}
    >
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
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
      >
        تعديل
      </Button>
      <Button
        disabled={selectedDirectoriedIds?.length == 0}
        color="error"
        variant="outlined"
        endIcon={<DeleteIcon />}
      >
        حذف
      </Button>
    </Stack>
  );
}
