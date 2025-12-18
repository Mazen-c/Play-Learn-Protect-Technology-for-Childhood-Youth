import { Card, CardContent, Typography } from "@mui/material";
import { useGame } from "../Context/Context";

const PointsCard = () => {
  const { points } = useGame();

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>⭐</span>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Your Points</Typography>
        </div>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>{points}</Typography>
        <Typography variant="body2" color="text.secondary">Keep learning to earn more!</Typography>
      </CardContent>
    </Card>
  );
};

export default PointsCard;

