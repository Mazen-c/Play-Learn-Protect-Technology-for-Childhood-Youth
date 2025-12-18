import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface LeaderboardPositionCardProps {
  position: number;
  totalPlayers: number;
  type?: "class" | "global";
}

const LeaderboardPositionCard = ({ position, totalPlayers, type = "class" }: LeaderboardPositionCardProps) => {
  const medalIcon = position === 1 ? "🥇" : position === 2 ? "🥈" : position === 3 ? "🥉" : position.toString();
  const percentage = Math.round(((totalPlayers - position + 1) / totalPlayers) * 100);
  const title = type === "class" ? "Class Rank" : "Global Rank";

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>{title}</Typography>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>{medalIcon}</Typography>
          <div style={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>#{position}</Typography>
            <Typography variant="body2" color="text.secondary">of {totalPlayers} players</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Top {percentage}%</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardPositionCard;

