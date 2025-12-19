import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useGame } from "../Context/Context";

const BadgeCard = () => {
  const { badges } = useGame();

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>🏅</span>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Badges</Typography>
        </div>
        {badges.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Earn badges by completing special tasks!
          </Typography>
        ) : (
          <List>
            {badges.map((badge, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span>🏅</span>
                      <Typography variant="body1">{badge}</Typography>
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

export default BadgeCard;

