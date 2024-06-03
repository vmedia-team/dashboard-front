import { Button, Stack, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function LibraryDocsSearch() {
  // TODO::declare and define component state and variables
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
        onChange={() => {}}
      />

      <Button
        variant="contained"
        onClick={() => {
          console.log("Handle Search Click");
        }}
      >
        بحث
      </Button>
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={() => {
          console.log("Handle Search Click");
        }}
      >
        فلتر
      </Button>
    </Stack>
  );
}
