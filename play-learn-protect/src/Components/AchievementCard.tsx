import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface AchievementCardProps {
    name: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ name }) => {
    return(
        <Card>
            <CardContent>
              <Typography variant="subtitle1">{name}</Typography>
            </CardContent>
        </Card>
    )
};

export default AchievementCard;