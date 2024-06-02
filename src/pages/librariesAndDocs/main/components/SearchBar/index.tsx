import { Stack, TextField, Button } from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import SelectWithFilter from "../../../../../components/SelectWithFilter";

export default function SearchBar(props: PropsType) {
  // TODO::declare and define component state and variables
  const dummyOptions = [{ label: "نوع المستند", value: 0 }];
  // TODO::declare and define component methods
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
          onChange={() => {}}
        />
        <Button
          variant="contained"
          onClick={() => {
            console.log("Handle Search Click");
          }}
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
