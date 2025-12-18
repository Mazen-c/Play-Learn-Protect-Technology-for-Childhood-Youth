import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useGame } from "../Context/Context";

const AchievementsCard = () => {
  const { achievements } = useGame();

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>🏆</span>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Achievements</Typography>
        </div>
        {achievements.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Complete challenges to unlock achievements!
          </Typography>
        ) : (
          <List>
            {achievements.map((achievement, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span>🏆</span>
                      <Typography variant="body1">{achievement}</Typography>
                    </div>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;

