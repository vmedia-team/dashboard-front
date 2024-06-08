import { Stack, TextField, Button } from "@mui/material";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { useContext, useState } from "react";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";

export default function SearchBar(props: PropsType) {
  // TODO::declare and define component state and variables
  const [name, setName] = useState("");
  const { handleSearch } = useContext(LibraryMainPageContext);
  const [directoryType, setDirectoryType] = useState(-1);
  const dummyOptions = [
    { label: "الكل", value: -1 },
    { label: "علني", value: 1 },
    { label: "مخصص", value: 0 },
  ];

  // TODO::declare and define component methods
  const handleSearchFun = () => {
    let params = "";
    if (name) params += `name=${name}`;
    if (directoryType != -1) {
      if (params.length > 0) {
        params += "&";
      }
      params += `type=${directoryType}`;
    }
    handleSearch(params);
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
          defaultValue={-1}
          select
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            setDirectoryType(+e.target.value);
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
