import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../components/CustomFilepond";
import { FileBondState } from "../../../../../types/FileBondState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../../constants";

export default function AddEditLibDialog(props: dialogProps) {
  // TODO::declare and define state and variables
  const [file, setFile] = useState<FileBondState>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<userT[]>([]);

  // TODO::fetch data of selects
  useEffect(() => {
    setLoading(true);
    axios
      .post<{ data: userT[] }>(Api(`employee/employees`))
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // TODO::declare and define helper methods
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSubmit = () => {};

  // * return our component ui
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      onSubmit={handleSubmit}
      component={"form"}
      maxWidth="sm"
      fullWidth
    >
      <Typography
        variant="h6"
        fontWeight={700}
        textAlign={"center"}
        marginTop={2}
      >
        اضافة ملف / تعديل
      </Typography>
      <DialogContent>
        {/* directory name */}
        <AddLabelToEl label="اسم الفولدر">
          <TextField size="small" placeholder="اسم الفولدر" />
        </AddLabelToEl>
        {/* directory icon */}
        <AddLabelToEl label="الايقون">
          <CustomFilePond
            files={file}
            onupdatefiles={(fileItems) => {
              setFile(fileItems.map((fileItem) => fileItem.file));
            }}
          />
        </AddLabelToEl>
        {/* directory type */}
        <AddLabelToEl label="أختر">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="علني" control={<Radio />} label="علني" />
            <FormControlLabel value="مخصص" control={<Radio />} label="مخصص" />
          </RadioGroup>
        </AddLabelToEl>
        {/* spefific users */}
        <Autocomplete
          //   disabled={disabled}
          multiple
          id="tags-outlined"
          options={users}
          //   onChange={(e, newVal) => {
          //     setValue(newVal);
          //     return "";
          //   }}
          getOptionLabel={(option) => option.full_name}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="اضف المستخدميين المخصص لهم الفولدر"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" fullWidth>
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type userT = { id: number; full_name: string };

type dialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
