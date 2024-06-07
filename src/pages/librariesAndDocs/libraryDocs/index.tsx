import { Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import LibraryDocsSearch from "./components/SearchBar";
import LibraryDocsMainPaper from "./components/MainPaper";
import BranchesBtns from "./components/BranchesBtns";
import { useState } from "react";
import ILovePdfFrameIndex from "./components/ILovePdfFrame";
import { LibraryDocumentionContextProvider } from "./context/LibraryDocumentionContext";
import AddEditLibDocDialog from "./components/Dialog";

export default function LibraryDocsIndex() {
  // TODO::declare and define component state and variables
  let { libraryId } = useParams();
  const [showPdfFrame, setShowPdfFrame] = useState(true);
  const fileUrl = "https://clickdimensions.com/links/TestPDFfile.pdf";
  // TODO::declare and define component methods
  console.log("libraryId", libraryId);
  // TODO::return component view
  return (
    <Stack>
      <LibraryDocumentionContextProvider>
        <LibraryDocsSearch />
        <BranchesBtns />
        <Grid container xs={12}>
          <Grid item xs={showPdfFrame ? 6 : 12}>
            <LibraryDocsMainPaper width={"100%"}/>
          </Grid>
          {showPdfFrame && (
            <Grid item xs={6}>
              <ILovePdfFrameIndex fileUrl={fileUrl} />
            </Grid>
          )}
        </Grid>
      </LibraryDocumentionContextProvider>
    </Stack>
  );
}
