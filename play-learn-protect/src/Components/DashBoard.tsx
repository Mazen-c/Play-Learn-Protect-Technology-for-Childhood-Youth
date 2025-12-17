import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ProgressBar from "./ProgressBar";
import AchievementCard from "./AchievementCard";
import Leaderboard from "./LeaderBoard";

const Dashboard: React.FC = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Points: 120</Typography>
            <ProgressBar progress={60} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Achievements</Typography>
            <AchievementCard name="Math Master" />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Leaderboard</Typography>
            <Leaderboard />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
