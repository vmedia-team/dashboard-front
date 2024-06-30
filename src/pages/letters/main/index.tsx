import { Stack, Typography, Box, Paper, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Letter } from "../../../types/Letter";
import { getLetters } from "../../../methods/api/letters";

function LettersMainPage() {
  const [search, setSearch] = useState("");
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    getLetters().then(setLetters).catch(console.log);
  }, []);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        الخطابات{" "}
      </Typography>
      <SearchBar
        search={search}
        setSearch={setSearch}
        getRequests={() => null}
        openAdvancedSearchDialog={() => {}}
      />
      <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
        الخطابات
      </Typography>

      <Paper
        sx={{
          overflow: "hidden",
          mb: 7,
        }}
        elevation={4}
      >
        <Stack padding={3} spacing={2}>
          <Box
            display="flex"
            flexDirection="row-reverse"
            flexWrap="wrap"
            alignItems="end"
            gap={2}
          >
            <Button
              size="large"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
            >
              انشاء خطاب
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              component={NavLink}
              to={"add"}
            >
              اضافة خطاب
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="row-reverse"
            flexWrap="wrap"
            alignItems="end"
            gap={2}
          >
            <Button color="error" variant="outlined" startIcon={<DeleteIcon />}>
              حذف
            </Button>
            <Button variant="contained" component={NavLink} to={"add"}>
              Recall
            </Button>
          </Box>
        </Stack>
        <Box>
          <Typography>{JSON.stringify(letters)}</Typography>
        </Box>
      </Paper>
    </Stack>
  );
}

export default LettersMainPage;
