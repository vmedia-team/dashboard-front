import { Grid } from "@mui/material";
import LibraryDocsMainPaper from "../MainPaper";
import ILovePdfFrameIndex from "../ILovePdfFrame";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import LibrariesLoading from "../../../main/components/loading";
import { MainBreadCrumbContext } from "../../../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function MainContentIndex() {
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );
  const [loading, _] = useState(false);
  const { activeFileToShow, searchLoadingState, mainDirectory } = useContext(
    LibraryDocumentionContext
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
