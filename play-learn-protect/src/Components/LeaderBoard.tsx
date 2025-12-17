import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

export interface LeaderboardEntry {
  name: string;
  points: number;
}

const defaultLeaderboardData: LeaderboardEntry[] = [
  { name: "Mazen", points: 250 },
  { name: "Ali", points: 200 },
  { name: "Hamza", points: 150 },
  { name: "Ibrahim", points: 100 },
  { name: "Youssef", points: 50 },
];

interface LeaderboardProps {
  data?: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data = defaultLeaderboardData }) => {
  return (
    <List>
      {data.map((player, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${index + 1}. ${player.name}`}
            secondary={`Points: ${player.points}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Leaderboard;