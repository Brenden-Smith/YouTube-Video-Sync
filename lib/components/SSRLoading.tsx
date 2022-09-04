import { CircularProgress } from "@mui/material";

export const SSRLoading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </div>
  );
}