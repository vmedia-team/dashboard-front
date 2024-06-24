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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { FileBondState } from "../../../../../../types/FileBondState";
import { useUser } from "../../../../../../contexts/user/user";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { useParams } from "react-router-dom";
import { LibrariesMainPageItemType } from "../../../../main/components/MainPaper/components/MianItemsData";
import { serialize } from "object-to-formdata";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function NestedDirectoryDialog(props: dialogProps) {
  // TODO::declare and define state and variables
  const [file, setFile] = useState<FileBondState>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<userT[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<userT[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm<FormTypeSchema>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  let { libraryId } = useParams();
  const {
    handleSetNestedDirectoryOpenDialog,
    selectedNestedDirectory,
    addNewDirectory,
    editExistDirectory,
    deleteDirectory,
  } = useContext(LibraryDocumentionContext);
  let isEdit = selectedNestedDirectory ? true : false;
  const [isPrivate, setIsPrivate] = useState(
    !isEdit ? false : selectedNestedDirectory?.type == 0
  );
  let defaultValues = {
    name: isEdit ? selectedNestedDirectory?.name : "",
    type: isEdit ? selectedNestedDirectory?.type : 1,
    employees: isEdit ? selectedNestedDirectory?.employees ?? [] : [],
  };

  // TODO::fetch data of selects & set data of directory in edit case
  useEffect(() => {
    // * reset data in form
    reset({
      name: isEdit ? selectedNestedDirectory?.name : "",
      type: isEdit ? selectedNestedDirectory?.type : 1,
      employees: isEdit ? selectedNestedDirectory?.employees ?? [] : [],
    });
    setIsPrivate(!isEdit ? false : selectedNestedDirectory?.type == 0);
    // * get users data
    axios
      .post<{ data: userT[] }>(Api(`employee/employees`))
      .then((res) => {
        setUsers(res?.data?.data);
        setSelectedUsers(selectedNestedDirectory?.employees ?? []);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
      });
  }, [props.open]);
  // TODO::declare and define helper methods
  const handleClose = () => {
    handleSetNestedDirectoryOpenDialog(false);
  };

  // * handle submit form...
  const onSubmit = handleSubmit(async (data) => {
    let body = {
      ...data,
      library_folder_id: libraryId,
      employees: data.type == 1 ? [] : data.employees?.map((ele) => ele.id),
      image: file[0],
    };

    setLoading(true);
    axios
      .post<{ folder: LibrariesMainPageItemType }>(
        Api(
          isEdit
            ? `employee/library/folder/update/${selectedNestedDirectory?.id}`
            : "employee/library/folder/store"
        ),
        serialize(body)
      )
      .then((response) => {
        // Appeand Condation
        if (body.type == 1) {
          //public
          if (isEdit) {
            editExistDirectory(response.data.folder);
          } else {
            addNewDirectory(response.data.folder);
          }
        } else {
          //private
          if (user?.employee_id) {
            if (body?.employees?.indexOf(user?.employee_id) == -1) {
              if (selectedNestedDirectory?.id)
                deleteDirectory(selectedNestedDirectory);
            } else {
              if (isEdit) {
                editExistDirectory(response.data.folder);
              } else {
                addNewDirectory(response.data.folder);
              }
            }
          } else {
            //hide doc
            if (selectedNestedDirectory?.id)
              deleteDirectory(selectedNestedDirectory);
          }
        }

        enqueueSnackbar(isEdit ? "تم التعديل بنجاح" : "تم الحفظ بنجاح");
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
        اضافة/تعديل مجلد 
      </Typography>
      <DialogContent>
        {/* directory name */}
        <AddLabelToEl label="اسم المجلد">
          <TextField
            disabled={loading}
            size="small"
            {...register("name")}
            placeholder="اسم المجلد"
          />
        </AddLabelToEl>
        {/* directory icon */}
        <AddLabelToEl label="الايقون">
          {isEdit &&
            selectedNestedDirectory?.media &&
            selectedNestedDirectory?.media?.length > 0 && (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                  padding: " 2px 10px",
                  border: "1px solid #808080b8",
                  margin: "5px auto",
                  borderRadius: "12px",
                  width: "100%",
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ cursor: "pointer" }}
                  component={`a`}
                  href={`${selectedNestedDirectory?.media?.[0]?.original_url}`}
                  target="_blank"
                  download
                >
                  <AttachFileIcon />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      textDecoration: "underline",
                    }}
                  >
                    {selectedNestedDirectory?.media?.[0]?.name}
                  </Typography>
                </Stack>
              </Stack>
            )}
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
              value="عامة"
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
              label="عامة"
            />
            <FormControlLabel
              value="خاصة"
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
              label="خاصة"
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
            value={selectedUsers}
            onChange={(e, newVal) => {
              setValue("employees", newVal);
              setSelectedUsers(newVal);
              return "";
            }}
            getOptionLabel={(option) => option.name}
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
type userT = { id: number; name: string };
type FormTypeSchema = {
  name: string;
  type: number;
  employees?: userT[];
};

type dialogProps = {
  open: boolean;
};
