import React, { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import ProgressCard from "./ProgressCard";
import PointsCard from "./PointsCard";
import AchievementsCard from "./AchievementsCard";
import BadgeCard from "./BadgeCard";
import LeaderboardPositionCard from "./LeaderboardPositionCard";
import Leaderboard from "../LeadBoard/Leaderboard";
import NotificationToast from "./NotificationToast";
import { useGame } from "../Context/Context";
import { useAlerts } from "../Alerts/AlertsContext";

const Dashboard = () => {
  const { currentNotification, clearNotification, classLeaderboardPosition, leaderboardPosition } = useGame();
  const auth = useAuth();
  const navigate = useNavigate();
  const isChild = auth.user?.role === "child";
  const { triggerAlert } = useAlerts();

  const handleLogout = () => {
    if (isChild) {
      auth.switchToParent();
    } else {
      auth.logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isChild) return;
    const key = "plp_dashboard_child_tip_shown";
    if (!sessionStorage.getItem(key)) {
      triggerAlert({
        severity: "minor",
        title: "Safety Tip",
        message: "Think before you post. Keep private info private.",
      });
      sessionStorage.setItem(key, "1");
    }
  }, [isChild, triggerAlert]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Your Dashboard
        </Typography>
        <Button color="secondary" variant="outlined" onClick={handleLogout}>
          {isChild ? "Back to Parent" : "Log out"}
        </Button>
      </Box>

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
