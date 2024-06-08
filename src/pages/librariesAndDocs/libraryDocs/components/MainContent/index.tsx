import { Grid } from "@mui/material";
import LibraryDocsMainPaper from "../MainPaper";
import ILovePdfFrameIndex from "../ILovePdfFrame";
import { useContext, useEffect } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";

export default function MainContentIndex() {
  const { activeFileToShow, handleSetActiveFile } = useContext(
    LibraryDocumentionContext
  );

  // useEffect(() => {
  //   handleSetActiveFile(undefined);
  // }, []);
  return (
    <Grid container>
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
    </Grid>
  );
}