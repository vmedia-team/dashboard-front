import { Stack, TextField, Button } from "@mui/material";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { useContext, useState } from "react";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";

export default function SearchBar(props: PropsType) {
  // TODO::declare and define component state and variables
  const dummyOptions = [{ label: "نوع المستند", value: 0 }];
  const [name, setName] = useState("");
  const { handleSearch } = useContext(LibraryMainPageContext);

  // TODO::declare and define component methods
  const handleSearchFun = () => {
    if (name) {
      handleSearch(name);
    }
  };
  // * Return Component UI
  return (
    <>
      <Stack
        direction="row"
        component={"form"}
        onSubmit={() => {}}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <SelectWithFilter
          options={dummyOptions}
          placeholder="نوع المستند"
          size="small"
          defaultValue={0}
          select
          onChange={() => {
            console.log("Handle Change");
          }}
          sx={{
            width: "28%",
          }}
        />
        {/* document num */}
        <TextField
          label="رقم المستند"
          // value={props.search}
          size="small"
          sx={{ width: "28%" }}
          onChange={() => {}}
        />
        {/* doc name */}
        <TextField
          label="الاسم"
          // value={props.search}
          size="small"
          sx={{ width: "28%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearchFun}
          sx={{
            flexGrow: 1,
          }}
        >
          بحث
        </Button>
      </Stack>
    </>
  );
}

type PropsType = {};
