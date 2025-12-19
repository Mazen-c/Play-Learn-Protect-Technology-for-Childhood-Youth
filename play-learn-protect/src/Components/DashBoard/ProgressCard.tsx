import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

const ProgressCard = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Learning Progress</Typography>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>65%</Typography>
          <Typography variant="body2" color="text.secondary">completed</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;

