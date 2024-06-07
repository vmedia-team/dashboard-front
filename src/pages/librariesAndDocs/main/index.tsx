import { Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MainPaper from "./components/MainPaper";
import { LibraryMainPageContextProvider } from "./context/LibraryMainPageContext";

export default function LibrariesAndDocsMainIndex() {
  return (
    <Stack>
      <LibraryMainPageContextProvider>
        <SearchBar />
        <MainPaper />
      </LibraryMainPageContextProvider>
    </Stack>
  );
}
