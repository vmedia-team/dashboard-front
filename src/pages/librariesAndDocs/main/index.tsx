import { Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MainPaper from "./components/MainPaper";

export default function LibrariesAndDocsMainIndex() {
  return (
    <Stack>
      <SearchBar />
      <MainPaper />
    </Stack>
  );
}
