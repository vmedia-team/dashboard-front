import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { LoadingButton } from "@mui/lab";
import CustomFilePond from "../../../../../components/CustomFilepond";

function SetDialog({ open, setOpen }: PropsType) {
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(!open)}
        component="form"
        // onSubmit={handleSubmit}
        maxWidth={"sm"}
      >
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            right: 20,
            mt: 3,
            border: "solid 1px ",
            borderRadius: "8px",
          }}
          color="primary"
          onClick={() => setOpen(!open)}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          اضافة مرفق
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AddLabelToEl label={"اسم المرفق"} required>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"رقم المرفق"} required>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"نوع المرفق"}>
                <Select size={"small"}>
                  <MenuItem value={1}>test</MenuItem>
                </Select>
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"ارفاق ملف"}>
                {/* <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <CustomFilePond
                      {...field}
                      onupdatefiles={(files) => {
                        field.onChange(files.map((file) => file.file)?.[0]);
                      }}
                      allowMultiple={false}
                      maxFiles={1}
                    />
                  )}
                /> */}
              </AddLabelToEl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton variant="contained" type="submit">
            اضافة
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default SetDialog;
