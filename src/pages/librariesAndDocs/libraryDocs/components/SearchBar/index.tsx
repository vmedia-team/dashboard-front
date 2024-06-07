import { Button, Stack, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useContext, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";

export default function LibraryDocsSearch() {
  // TODO::declare and define component state and variables
  const [name, setName] = useState("");
  const { handleSearch } = useContext(LibraryDocumentionContext);
  // TODO::declare and define component methods
  // TODO::return component view
  return (
    <Stack
      direction="row"
      component={"form"}
      onSubmit={() => {}}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
    >
      {/* document num */}
      <TextField
        label="بحث"
        // value={props.search}
        size="small"
        sx={{ flexGrow: 1 }}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={() => {
          handleSearch(name);
        }}
      >
        بحث
      </Button>
      <Button variant="outlined" startIcon={<FilterAltIcon />}>
        فلتر
      </Button>
    </Stack>
  );
}
