import { Grid } from "@mui/material";
import LibraryDocsMainPaper from "../MainPaper";
import ILovePdfFrameIndex from "../ILovePdfFrame";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import LibrariesLoading from "../../../main/components/loading";

export default function MainContentIndex() {
  const [loading, setLoading] = useState(false);
  const { activeFileToShow, searchLoadingState } = useContext(
    LibraryDocumentionContext
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 4000);
  }, []);

  return (
    <Grid container>
      {loading && <LibrariesLoading />}
      {!loading &&
        (searchLoadingState ? (
          <LibrariesLoading />
        ) : (
          <>
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
