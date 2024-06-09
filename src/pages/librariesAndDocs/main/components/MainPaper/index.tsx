import { Paper } from "@mui/material";
import ListMainItems from "./components/ListMainItems";

export default function MainPaper() {
  return (
    <Paper
      elevation={2}
      sx={{
        bgcolor: "background.paper",
        mt: 1,
        p: 5,
      }}
    >
      <ListMainItems />
    </Paper>
  );
}
