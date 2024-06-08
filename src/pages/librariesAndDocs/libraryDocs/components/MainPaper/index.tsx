import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import "../../../main/components/MainPaper/components/styles.scss";
import ListOfLibraryDocs from "./components/ListOfLibraryDocs";
import { useContext } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";

export default function LibraryDocsMainPaper(props: PropsType) {
  const { SelectAll, selectedFilesIds, files } = useContext(
    LibraryDocumentionContext
  );

  return (
    <Paper
      elevation={2}
      sx={{
        bgcolor: "background.paper",
        mt: 2,
        p: 5,
        width: props.width,
      }}
      className="fadeInUp"
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedFilesIds.length == files.length}
            onChange={() => SelectAll()}
            name="select_all"
          />
        }
        label={selectedFilesIds.length == files.length?"ازالة تحديد الكل":"تحديد الكل"}
      />
      <ListOfLibraryDocs />
    </Paper>
  );
}

type PropsType = {
  width: string;
};
