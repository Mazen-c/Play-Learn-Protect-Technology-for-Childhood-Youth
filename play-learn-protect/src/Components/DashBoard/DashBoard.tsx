import React from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ProgressCard from "./ProgressCard";
import PointsCard from "./PointsCard";
import AchievementsCard from "./AchievementsCard";
import BadgeCard from "./BadgeCard";
import LeaderboardPositionCard from "./LeaderboardPositionCard";
import Leaderboard from "../LeadBoard/Leaderboard";
import NotificationToast from "./NotificationToast";
import { useGame } from "../Context/Context";

const Dashboard = () => {
  const { currentNotification, clearNotification, classLeaderboardPosition, leaderboardPosition } = useGame();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
        Your Dashboard
      </Typography>

      <NotificationToast notification={currentNotification} onClose={clearNotification} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointsCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LeaderboardPositionCard
            position={classLeaderboardPosition}
            totalPlayers={10}
            type="class"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <AchievementsCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <BadgeCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ProgressCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LeaderboardPositionCard
            position={leaderboardPosition}
            totalPlayers={50}
            type="global"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Leaderboard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
