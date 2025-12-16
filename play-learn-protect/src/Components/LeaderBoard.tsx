import React from 'react';
import {List  , ListItem , ListItemText} from "@mui/material";

const LeaderBoardData = [  
    { rank: 1, name: "Mazen", points: 250 },
    { rank: 2, name: "Ali", points: 200 },
    { rank: 3, name: "Hamza", points: 150 },
    { rank: 4, name: "Ibrahim", points: 100 },
    { rank: 5, name: "Youssef", points: 50 },
];

const Leaderboard: React.FC = () => {
    return(
        <List>
            {LeaderBoardData.map((player , index) => (
                <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${player.name}`} secondary={`Points: ${player.points}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default Leaderboard;