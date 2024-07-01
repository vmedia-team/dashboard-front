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
import { LoadingButton } from "@mui/lab";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";

function SetDialog(props: PropsType) {
  // TODO::declare and define component state and variables here.
  let { open, setOpen } = props;
  // TODO::declare and define component helper methods here.
  // * return component UI.
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
        {/* close dialog */}
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
            {/* name */}
            <Grid item xs={6}>
              <AddLabelToEl label={"اسم المرفق"} required>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* code */}
            <Grid item xs={6}>
              <AddLabelToEl label={"رقم المرفق"} required>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* type */}
            <Grid item xs={6}>
              <AddLabelToEl label={"نوع المرفق"}>
                <Select size={"small"}>
                  <MenuItem value={1}>test</MenuItem>
                </Select>
              </AddLabelToEl>
            </Grid>
            {/* attachments files */}
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
