import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./Context/AuthContext";
import { useTheme } from "./Context/ThemeContext";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { isDark, toggleDarkMode } = useTheme();



  const isEducator = auth.user && ((auth.user.role as string) === "educator" || (auth.user.role as string) === "teacher");
  const isParent = auth.user?.role === "parent";
  const isChild = auth.user?.role === "child";

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 2 }}>
      <Toolbar sx={{ gap: 0.5, px: { xs: 1, sm: 2 } }}>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
          }}
        >
          {t("home") as string}
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/tutorials"
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
          }}
        >
          Tutorials
        </Button>
        {isChild && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/game"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              {t("game") as string}
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/creative-studio"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Creative Studio
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/child/assignments"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Assignments
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/child/modules"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Modules
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/child/challenges"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Challenges
            </Button>
          </>
        )}
        {isParent && (
          <Button
            color="inherit"
            component={Link}
            to="/parent/classes"
            sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
          >
            Classes
          </Button>
        )}
        {isEducator && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/teacher/classes"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Classes
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/teacher/assignments"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Assignments
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/teacher/challenges"
              sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Challenges
            </Button>
          </>
        )}
        {isParent && (
          <Button
            color="inherit"
            component={Link}
            to="/parent/manage-children"
            sx={{ borderRadius: 2, px: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
          >
            My Children
          </Button>
        )}
        {isChild && (
          <Button
            color="inherit"
            onClick={() => auth.switchToParent()}
            sx={{
              ml: "auto",
              borderRadius: 2,
              px: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
            }}
          >
            Back to Parent View
          </Button>
        )}
        <Button
          color="inherit"
          onClick={toggleDarkMode}
          sx={{
            marginLeft: isChild ? undefined : "auto",
            borderRadius: 2,
            minWidth: 48,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
          }}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? "☀️" : "🌙"}
        </Button>

        <Button
          color="inherit"
          onClick={() => auth.logout()}
          sx={{
            ml: 1,
            borderRadius: 2,
            px: 2,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
          }}
        >
          {t("logout") as string}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
