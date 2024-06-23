import { Grid, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import LibraryDocsMainPaper from "../MainPaper";
import ILovePdfFrameIndex from "../ILovePdfFrame";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import LibrariesLoading from "../../../main/components/loading";
import { MainBreadCrumbContext } from "../../../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MainContentIndex() {
  // todo::declare and define helper state and variables....
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );
  const [loading, _] = useState(false);
  const {
    SelectAll,
    selectedFilesIds,
    files,
    activeFileToShow,
    searchLoadingState,
    mainDirectory,
    handleOenDialog,
    handleSetEditFile,
  } = useContext(LibraryDocumentionContext);

  useEffect(() => {
    // set breadcrumb terms
    handleClearLinks();
    handleAddNewTerm({
      title: "مكتبة البيانات",
      path: "/react/librariesAndDocs",
    });
    handleAddNewTerm({
      title: mainDirectory?.name ?? "",
      path: `/react/librariesAndDocs/${mainDirectory?.id}`,
    });
  }, [mainDirectory]);

  // todo::declare and define helper methods
  const handleEdit = () => {
    handleSetEditFile(true);
    handleOenDialog(true);
  };

  return (
    <Grid container>
      {loading && <LibrariesLoading />}
      {!loading &&
        (searchLoadingState ? (
          <LibrariesLoading />
        ) : (
          <>
            <Grid item xs={12} my={1} p={2}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        selectedFilesIds?.length == files?.length &&
                        files?.length != 0
                      }
                      onChange={() => SelectAll()}
                      name="select_all"
                    />
                  }
                  label={
                    selectedFilesIds?.length == files?.length &&
                    files?.length != 0
                      ? "ازالة تحديد الكل"
                      : "تحديد الكل"
                  }
                />
                <Stack direction={"row"} spacing={1}>
                  <Button
                    disabled={selectedFilesIds?.length != 1}
                    color="info"
                    variant="outlined"
                    endIcon={<EditIcon />}
                    onClick={() => handleEdit()}
                  >
                    تعديل
                  </Button>
                  <Button
                    disabled={selectedFilesIds?.length == 0}
                    color="error"
                    variant="outlined"
                    endIcon={<DeleteIcon />}
                    // onClick={handleDelete}
                  >
                    حذف
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={activeFileToShow ? 6 : 12}>
              <LibraryDocsMainPaper width={"100%"} />
            </Grid>
            {activeFileToShow && (
              <Grid item xs={6} sx={{ position: "relative" }}>
                <ILovePdfFrameIndex
                  fileUrl={activeFileToShow?.media?.[0]?.original_url}
                />
              </Grid>
            )}
          </>
        ))}
    </Grid>
  );
}
