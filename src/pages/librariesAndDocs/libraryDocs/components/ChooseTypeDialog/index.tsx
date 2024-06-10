import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";

export default function ChooseTypeDialog(props: dialogProps) {
  // TODO::declare and define state and variables
  const [loading, setLoading] = useState(false);
  const [creationType, setCreationType] = useState<"File" | "Directory">(
    "File"
  );
  const { handleOenDialog, handleSetNestedDirectoryOpenDialog } = useContext(
    LibraryDocumentionContext
  );

  // TODO::fetch data of selects & set data of directory in edit case
  useEffect(() => setCreationType("File"), [props.open]);

  // TODO::declare and define helper methods
  const handleClose = () => {
    props.setOpen(false);
  };

  // * handle submit form....
  const handleSubmit = () => {
    if (creationType == "File") {
      handleOenDialog(true);
    } else {
      handleSetNestedDirectoryOpenDialog(true);
    }
    handleClose();
  };

  // * return our component ui
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
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
        أختر النوع
      </Typography>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            control={
              <Radio
                checked={creationType == "File"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCreationType("File");
                  }
                }}
              />
            }
            label="أنشاء ملف"
          />
          <FormControlLabel
            control={
              <Radio
                checked={creationType == "Directory"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCreationType("Directory");
                  }
                }}
              />
            }
            label="أنشاء فولدر"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} variant="contained" type="submit" fullWidth>
          التالي
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type dialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
