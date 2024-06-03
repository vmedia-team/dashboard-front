import { Stack } from "@mui/material";
import SingleDoc from "./SingleDoc";

export default function ListOfLibraryDocs() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Stack direction={"row"} flexWrap={"wrap"} spacing={2} width={"100%"}>
      {arr.map((ele) => (
        <SingleDoc key={ele} />
      ))}
    </Stack>
  );
}
