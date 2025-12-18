import { Card, CardContent, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ClassLeaderboard from "./ClassLeaderboard";
import GlobalLeaderboard from "./GlobalLeaderboard";

const Leaderboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Class Leaderboard" />
          <Tab label="Global Leaderboard" />
        </Tabs>
        {tab === 0 && <ClassLeaderboard />}
        {tab === 1 && <GlobalLeaderboard />}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;

