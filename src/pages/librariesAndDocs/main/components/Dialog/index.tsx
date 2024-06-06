import {
  Autocomplete,
  Button,
  CircularProgress,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import { LibrariesMainPageItemType } from "../MainPaper/components/MianItemsData";

export default function AddEditLibDialog(props: dialogProps) {
  // TODO::declare and define state and variables
  const [file, setFile] = useState<FileBondState>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<userT[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let defaultValues = { name: "", type: 1, employees: [] };
  const { register, handleSubmit, reset, setValue } = useForm<DialogFormType>({
    resolver: zodResolver(FormTypeSchema),
    defaultValues: defaultValues,
  });

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
  const onSubmit = handleSubmit(async (data) => {
    let body = {
      ...data,
      image: file[0],
    };
    setLoading(true);
    axios
      .post<{ folder: LibrariesMainPageItemType }>(
        Api("employee/library/folder/store"),
        serialize(body)
      )
      .then((response) => {
        props.setMainPageItems((prev) => [...prev, response.data.folder]);
        enqueueSnackbar("تم الحفظ بنجاح");
        handleClose();
        // clear content of form
        setFile([]);
        setIsPrivate(false);
        reset(defaultValues);
      })
      .catch((err) => {
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => setLoading(false));
  });

  // * return our component ui
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      onSubmit={onSubmit}
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
        اضافة فولدر / تعديل
      </Typography>
      <DialogContent>
        {/* directory name */}
        <AddLabelToEl label="اسم الفولدر">
          <TextField
            disabled={loading}
            size="small"
            {...register("name")}
            placeholder="اسم الفولدر"
          />
        </AddLabelToEl>
        {/* directory icon */}
        <AddLabelToEl label="الايقون">
          <CustomFilePond
            files={file}
            disabled={loading}
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
            <FormControlLabel
              value="علني"
              disabled={loading}
              control={
                <Radio
                  checked={!isPrivate}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("type", 1);
                      setIsPrivate(false);
                    }
                  }}
                />
              }
              label="علني"
            />
            <FormControlLabel
              value="مخصص"
              disabled={loading}
              control={
                <Radio
                  checked={isPrivate}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("type", 0);
                      setIsPrivate(true);
                    }
                  }}
                />
              }
              label="مخصص"
            />
          </RadioGroup>
        </AddLabelToEl>
        {/* spefific users */}
        {isPrivate && (
          <Autocomplete
            //   disabled={disabled}
            multiple
            disabled={loading}
            id="tags-outlined"
            options={users}
            onChange={(e, newVal) => {
              console.log("newVal", newVal);
              setValue(
                "employees",
                newVal.map((ele) => ele.id)
              );
              return "";
            }}
            getOptionLabel={(option) => option.full_name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="اضف المستخدميين المخصص لهم الفولدر"
              />
            )}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} variant="contained" type="submit" fullWidth>
          {loading && <CircularProgress size={16} />}
          {loading ? " جاري الحفظ...." : "حفظ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// declare needed types
type userT = { id: number; full_name: string };
const FormTypeSchema = z.object({
  name: z.string().min(2),
  type: z.number(),
  employees: z.number().array().optional(),
});

type DialogFormType = z.infer<typeof FormTypeSchema>;

type dialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMainPageItems: React.Dispatch<
    React.SetStateAction<LibrariesMainPageItemType[]>
  >;
};
