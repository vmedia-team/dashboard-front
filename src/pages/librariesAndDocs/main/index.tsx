import { Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MainPaper from "./components/MainPaper";
import { LibraryMainPageContextProvider } from "./context/LibraryMainPageContext";
import AggregationBtns from "./components/AggregationBtns";

export default function LibrariesAndDocsMainIndex() {
  return (
    <Stack>
      <LibraryMainPageContextProvider>
        <SearchBar />
        <AggregationBtns />
        <MainPaper />
      </LibraryMainPageContextProvider>
    </Stack>
  );
}
