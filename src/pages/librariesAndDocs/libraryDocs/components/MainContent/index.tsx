import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  ButtonGroup,
} from "@mui/material";
import LibraryDocsMainPaper from "../MainPaper";
import ILovePdfFrameIndex from "../ILovePdfFrame";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import LibrariesLoading from "../../../main/components/loading";
import { MainBreadCrumbContext } from "../../../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Api } from "../../../../../constants";
import { DocumentationFileType } from "../../../../../types/librariesAndDocs/DocumentationFile";

export default function MainContentIndex() {
  // todo::declare and define helper state and variables....
  const {
    SelectAll,
    selectedFilesIds,
    files,
    activeFileToShow,
    searchLoadingState,
    mainDirectory,
    handleOenDialog,
    handleSetEditFile,
    handleHideShowDeleteDialog,
    canCopy,
    canPaste,
    handleTransferFile,
    handlePasteFile,
    deleteSelectedFiles,
  } = useContext(LibraryDocumentionContext);
  const [loading, _] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

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
  const handleCopyFiles = () => {
    //check there are a selected file(s)
    if (selectedFilesIds.length === 0) {
      enqueueSnackbar("قم بتحديد الملف/الملفات اولا", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }
    // start copy process
    axios
      .post(Api(`employee/library/file/copy`), {
        ids: selectedFilesIds,
      })
      .then(() => {
        handleTransferFile();
        enqueueSnackbar("تم نسخ الملف/الملفات للحافظة بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر النسخ فى الحافظة", { variant: "error" });
      });
  };

  const handleCutFiles = () => {
    //check there are a selected file(s)
    if (selectedFilesIds.length == 0) {
      enqueueSnackbar("قم بتحديد الملف/الملفات اولا", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }
    // start cut process
    axios
      .post(Api(`employee/library/file/cut`), {
        ids: selectedFilesIds,
      })
      .then(() => {
        handleTransferFile();
        deleteSelectedFiles();
        enqueueSnackbar("تم نقل الملف/الملفات للحافظة بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر النقل فى الحافظة", { variant: "error" });
      });
  };

  const handlePaste = () => {
    axios
      .post<{ pasted_files: DocumentationFileType[] }>(
        Api(`employee/library/file/paste/${mainDirectory?.id}`)
      )
      .then((response) => {
        console.log("response1011::", response);
        handlePasteFile(response.data?.pasted_files ?? []);
        enqueueSnackbar("تم", { autoHideDuration: 2000 });
      })
      .catch((err) => {
        enqueueSnackbar("تعذر", { variant: "error", autoHideDuration: 2000 });
      });
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
                <ButtonGroup variant="text" aria-label="library files btns">
                  <Button
                    onClick={handleCopyFiles}
                    disabled={!canCopy}
                    startIcon={<CopyAllIcon />}
                  >
                    نسخ
                  </Button>
                  <Button
                    onClick={handleCutFiles}
                    disabled={!canCopy}
                    startIcon={<ContentCutIcon />}
                  >
                    قص
                  </Button>
                  <Button
                    onClick={handlePaste}
                    disabled={!canPaste}
                    startIcon={<ContentPasteGoIcon />}
                  >
                    لصق
                  </Button>
                  <FormControlLabel
                    sx={{ mx: 0.5 }}
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
                </ButtonGroup>
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
                    disabled={selectedFilesIds?.length === 0}
                    color="error"
                    variant="outlined"
                    endIcon={<DeleteIcon />}
                    onClick={() => handleHideShowDeleteDialog(true)}
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
