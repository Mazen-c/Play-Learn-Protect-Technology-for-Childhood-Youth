import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from "@mui/material";
import { useGame } from "../Context/Context";

interface LeaderboardEntry {
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

const data: LeaderboardEntry[] = [
  { name: "Ahmed", points: 500 },
  { name: "Ibrahim", points: 450 },
  { name: "Ali", points: 380 },
  { name: "Hamza", points: 320 },
  { name: "Youseef", points: 250 },
  { name: "Mazen", points: 120, isCurrentUser: true },
  { name: "Yehia", points: 100 },
];

const GlobalLeaderboard = () => {
  const { points } = useGame();
  
  const updatedData = data.map(entry => entry.isCurrentUser ? { ...entry, points } : entry);
  const sortedData = [...updatedData].sort((a, b) => b.points - a.points);
  const currentUserPosition = sortedData.findIndex(entry => entry.isCurrentUser || entry.name === "You") + 1;

  const topFive = sortedData.slice(0, 5);
  const userEntry = currentUserPosition > 5 ? sortedData[currentUserPosition - 1] : null;
  const displayData = userEntry && !topFive.find(u => u.name === userEntry.name) 
    ? [...topFive, userEntry] 
    : topFive;

  const getMedalIcon = (pos: number) => pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos.toString();

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span>🌍</span>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Global Leaderboard</Typography>
        </div>
        <List>
          {displayData.map((user, index) => {
            const actualPosition = sortedData.findIndex(entry => entry.name === user.name) + 1;
            const isCurrentUser = user.isCurrentUser || user.name === "You";
            const showSeparator = index === 4 && currentUserPosition > 5;

            return (
              <React.Fragment key={index}>
                {showSeparator && (
                  <div style={{ textAlign: "center", margin: "8px 0", color: "#666" }}>...</div>
                )}
                <ListItem
                  sx={{
                    bgcolor: isCurrentUser ? "#e3f2fd" : "transparent",
                    borderRadius: 1,
                    mb: 1,
                    border: isCurrentUser ? "1px solid #1976d2" : "none",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{getMedalIcon(actualPosition)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Typography variant="body1" sx={{ fontWeight: isCurrentUser ? "bold" : "normal" }}>
                          {user.name}
                        </Typography>
                        {isCurrentUser && <Chip label="You" size="small" color="primary" />}
                      </div>
                    }
                    secondary={`${user.points} points`}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
        {currentUserPosition > 5 && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Your position: #{currentUserPosition} out of {sortedData.length} players
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlobalLeaderboard;

