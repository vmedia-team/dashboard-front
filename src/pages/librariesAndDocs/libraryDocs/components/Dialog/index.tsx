import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileBondState } from "../../../../../types/FileBondState";
import { useUser } from "../../../../../contexts/user/user";
import { Api } from "../../../../../constants";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../components/CustomFilepond";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import { DocumentationFileType } from "../../../../../types/librariesAndDocs/DocumentationFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function AddEditLibDocDialog(props: dialogProps) {
  // TODO::declare and define state and variables
  const [file, setFile] = useState<FileBondState>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<userT[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<userT[]>([]);
  const { register, control, handleSubmit, reset, setValue } =
    useForm<FormTypeSchema>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const [isPrivate, setIsPrivate] = useState(false);
  const {
    handleOenDialog,
    libraryId,
    addNewDocumentation,
    activeFileToShow,
    handleSetEditFile,
    editFile,
    editExistDocumentation,
    deleteFile,
  } = useContext(LibraryDocumentionContext);

  // TODO::fetch data of selects & set data of directory in edit case
  useEffect(() => {
    // clear form data
    if (!editFile) {
      //create
      setFile([]);
      setIsPrivate(false);
      setSelectedUsers([]);
      reset({
        name: "",
        reference_number: "",
        end_date: "",
        notify_date: "",
        type: 1,
        employees: [],
      });
    } else {
      //edit
      reset({
        name: activeFileToShow?.name,
        reference_number: activeFileToShow?.reference_number,
        end_date: activeFileToShow?.end_date,
        notify_date: activeFileToShow?.notify_date,
        type: activeFileToShow?.type,
        employees: activeFileToShow?.employees ?? [],
      });
      setSelectedUsers(activeFileToShow?.employees ?? []);
      setIsPrivate(activeFileToShow?.type == 0 ? true : false);
    }
    // * get users data
    axios
      .post<{ data: userT[] }>(Api(`employee/employees`))
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
      });
  }, [props.open]);

  console.log("activeFileToShow", activeFileToShow);

  // TODO::declare and define helper methods
  const handleClose = () => {
    handleSetEditFile(false);
    handleOenDialog(false);
  };

  // * handle submit form....
  const onSubmit = handleSubmit(async (data) => {
    let body = {
      ...data,
      employees: data.type == 1 ? [] : data.employees?.map((ele) => ele.id),
      image: file[0],
      library_folder_id: libraryId,
    };
    setLoading(true);
    axios
      .post<{ file: DocumentationFileType }>(
        Api(
          editFile
            ? `employee/library/file/update/${activeFileToShow?.id}`
            : "employee/library/file/store"
        ),
        serialize(body)
      )
      .then((response) => {
        if (body.type == 1) {
          //public
          if (editFile) {
            editExistDocumentation(response.data.file);
          } else {
            addNewDocumentation(response.data.file);
          }
        } else {
          //private
          if (user?.employee_id) {
            if (body?.employees?.indexOf(user?.employee_id) == -1) {
              if (activeFileToShow?.id) deleteFile(activeFileToShow?.id);
            } else {
              if (editFile) {
                editExistDocumentation(response.data.file);
              } else {
                addNewDocumentation(response.data.file);
              }
            }
          } else {
            //hide doc
            if (activeFileToShow?.id) deleteFile(activeFileToShow?.id);
          }
        }
        enqueueSnackbar("تم الحفظ بنجاح");
        handleClose();
      })
      .catch((err) => {
        console.log("errrr", err);
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
        انشاء مستند جديد
      </Typography>
      <DialogContent>
        <Grid container>
          {/* directory name */}
          <Grid item xs={6} px={2}>
            <AddLabelToEl label="الاسم">
              <TextField
                disabled={loading}
                size="small"
                {...register("name")}
                placeholder="الاسم"
              />
            </AddLabelToEl>
          </Grid>
          {/* directory reference_number */}
          <Grid item xs={6} px={2}>
            <AddLabelToEl label="الرقم المرجعي">
              <TextField
                disabled={loading}
                size="small"
                {...register("reference_number")}
                placeholder="الرقم المرجعي"
              />
            </AddLabelToEl>
          </Grid>
          {/* end date */}
          <Grid item xs={6} px={2}>
            <AddLabelToEl label="تاريخ الانتهاء">
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </Grid>
          {/* notify_date */}
          <Grid item xs={6} px={2}>
            <AddLabelToEl label="تاريخ الاشعار">
              <Controller
                name="notify_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </Grid>
          {/* icon & type */}
          <Grid
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            {/* icon */}
            <Grid item xs={6} px={2}>
              <AddLabelToEl label="الايقون" required>
                {editFile &&
                  activeFileToShow?.media &&
                  activeFileToShow?.media?.length > 0 && (
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
                        href={`${activeFileToShow?.media?.[0]?.original_url}`}
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
                          {activeFileToShow?.media?.[0]?.name?.length ?? 0 > 8
                            ? activeFileToShow?.media?.[0]?.name?.substring(
                                0,
                                8
                              )
                            : activeFileToShow?.media?.[0]?.name}
                        </Typography>
                      </Stack>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
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
            </Grid>
            {/* type */}
            <Grid item xs={6} px={2}>
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
            </Grid>
          </Grid>
          {/* users */}
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
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
  reference_number: number | string;
  end_date: string;
  notify_date: string;
  type: number;
  employees?: userT[];
};

type dialogProps = {
  open: boolean;
};
