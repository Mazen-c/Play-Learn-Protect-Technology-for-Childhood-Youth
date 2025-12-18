import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from "@mui/material";
import { useGame } from "../Context/Context";

interface LeaderboardEntry {
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

const data: LeaderboardEntry[] = [
  { name: "Ahmed", points: 150 },
  { name: "Mossa", points: 130 },
  { name: "Saeed", points: 120, isCurrentUser: true },
  { name: "HamzaB", points: 100 },
  { name: "Mohamed", points: 90 },
];

const ClassLeaderboard = () => {
  const { points } = useGame();
  
  const updatedData = data.map(entry => entry.isCurrentUser ? { ...entry, points } : entry);
  const sortedData = [...updatedData].sort((a, b) => b.points - a.points);

  const getMedalIcon = (pos: number) => pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos.toString();

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span>🏆</span>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Class Leaderboard</Typography>
        </div>
        <List>
          {sortedData.map((user, index) => {
            const position = index + 1;
            const isCurrentUser = user.isCurrentUser || user.name === "You";

            return (
              <ListItem
                key={index}
                sx={{
                  bgcolor: isCurrentUser ? "#e3f2fd" : "transparent",
                  borderRadius: 1,
                  mb: 1,
                  border: isCurrentUser ? "1px solid #1976d2" : "none",
                }}
              >
                <ListItemAvatar>
                  <Avatar>{getMedalIcon(position)}</Avatar>
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
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ClassLeaderboard;

