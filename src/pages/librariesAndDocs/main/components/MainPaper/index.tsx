import { Paper } from "@mui/material";
import ListMainItems from "./components/ListMainItems";
import "./components/styles.scss";

export default function MainPaper() {
  return (
    <Paper
      elevation={2}
      sx={{
        bgcolor: "background.paper",
        mt: 10,
        p: 5,
      }}
      className="fadeInUp"
    >
      <ListMainItems />
    </Paper>
  );
}
