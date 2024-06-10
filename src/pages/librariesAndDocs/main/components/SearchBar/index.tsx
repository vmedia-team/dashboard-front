import { Stack, TextField, Button } from "@mui/material";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { useContext, useState } from "react";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";

export default function SearchBar(props: PropsType) {
  // TODO::declare and define component state and variables
  const [name, setName] = useState("");
  const [reference_number, setReference_number] = useState("");
  const [file_name, setFile_name] = useState("");
  const { handleSearch, directoriesNames, handleSetSearchInfiles } = useContext(
    LibraryMainPageContext
  );

  // TODO::declare and define component methods
  const handleSearchFun = () => {
    let params = "",
      count = 0;
    if (name && name != "الكل") params += `name=${name}`;
    if (reference_number) {
      if (params.length) params += "&";
      params += `reference_number=${reference_number}`;
    } else count++;
    if (file_name) {
      if (params.length) params += "&";
      params += `file_name=${file_name}`;
    } else count++;

    if (count < 2) handleSetSearchInfiles(true);
    else handleSetSearchInfiles(false);
    
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
          options={directoriesNames}
          placeholder="نوع المستند"
          size="small"
          defaultValue={-1}
          select
          onChange={(e) => {
            setName(
              directoriesNames.find((ele) => ele.value == +e.target.value)
                ?.label ?? ""
            );
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
          onChange={(e) => setReference_number(e.target.value)}
        />
        {/* doc name */}
        <TextField
          label="الاسم"
          // value={props.search}
          size="small"
          sx={{ width: "28%" }}
          onChange={(e) => setFile_name(e.target.value)}
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
