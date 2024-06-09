import { Grid, Typography } from "@mui/material";
import FilesList from "./components/FilesList";
import ShowFileContent from "./components/ShowFileContent";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../../../context/LibraryMainPageContext";

export default function SearchByFileNameAndRefNum() {
  const { selectedResultFile } = useContext(LibraryMainPageContext);

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant="h6" fontWeight={600} my={2}>
          نتائج البحث
        </Typography>
      </Grid>
      <Grid xs={selectedResultFile ? 6 : 12}>
        <FilesList />
      </Grid>
      {selectedResultFile && (
        <Grid xs={6}>
          <ShowFileContent url={selectedResultFile?.media?.[0]?.original_url} />
        </Grid>
      )}
    </Grid>
  );
}
