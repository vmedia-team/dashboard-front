import { Paper } from "@mui/material";
import "../../../main/components/MainPaper/components/styles.scss";
import ListOfLibraryDocs from "./components/ListOfLibraryDocs";

export default function LibraryDocsMainPaper(props: PropsType) {
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
      <ListOfLibraryDocs />
    </Paper>
  );
}

type PropsType = {
  width: string;
};
