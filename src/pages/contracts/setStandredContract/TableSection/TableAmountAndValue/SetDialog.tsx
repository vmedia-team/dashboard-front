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
          اضافة بند
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AddLabelToEl label={"كود البند"}>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"وصف قصير للبند"}>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"وصف طويل للبند"}>
                <TextField size="small" multiline minRows={4} />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"اختيار نموذج العقد"}>
                <Select size={"small"}>
                  <MenuItem value={1}>test</MenuItem>
                </Select>
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6} sx={{ offset: "6" }}>
              <AddLabelToEl label={"وحدة"}>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"السعر"}>
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6}>
              <AddLabelToEl label={"القيمة"}>
                <TextField size="small" />
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
