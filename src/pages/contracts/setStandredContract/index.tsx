import { AccordionDetails, AccordionSummary } from "@mui/material";
import { Accordion } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContructData from "./FormSection/ContructData";
import TableAmountAndValue from "./TableSection/TableAmountAndValue";
import TableAttachmentContruct from "./TableSection/TableAttachmentContruct";

function SetStandredContract() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء عقد موحد
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          بيانات العقد
        </AccordionSummary>
        <AccordionDetails>
          <ContructData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          الكميات والقيمة المالية والبنود
        </AccordionSummary>
        <AccordionDetails>
          <TableAmountAndValue />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          مرفقات العقد
        </AccordionSummary>
        <AccordionDetails>
          <TableAttachmentContruct />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default SetStandredContract;
