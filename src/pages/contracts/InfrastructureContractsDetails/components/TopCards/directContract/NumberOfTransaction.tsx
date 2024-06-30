import { Box, Typography } from "@mui/material";
import { TransactionType } from "../../../../../../types/Contracts/ContractTransactionAttachment";

export default function NumberOfTransaction(props: PropsType) {
  // todo::declare and define component state and variables
  let { allProcessing } = props;

  //   return component ui.
  return (
    <Box
      sx={{
        width: "15%",
        background: "linear-gradient(-45deg, #cddae8, transparent)",
        minHeight: "200px",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="body1"
        fontSize={15}
        fontWeight={700}
        marginBottom={1}
      >
        ارقام المعاملات
      </Typography>
      <Box
        sx={{
          height: "150px",
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
        }}
      >
        {allProcessing?.map((processing) => {
          return (
            <Box key={processing.id} display={"flex"} marginY={2}>
              <Typography
                color={"primary.main"}
                variant="body2"
                fontSize={14}
                fontWeight={500}
                marginX={1}
              >
                {processing.receiver}
              </Typography>
              <Typography
                color={"secondary.main"}
                variant="body2"
                fontSize={14}
                fontWeight={500}
              >
                {processing.id}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

type PropsType = {
  allProcessing: TransactionType[];
};
