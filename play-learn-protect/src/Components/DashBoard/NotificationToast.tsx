import React, { useEffect, useState } from "react";
import { Snackbar, Alert, AlertTitle, IconButton } from "@mui/material";
import { Notification } from "../Context/Context";

interface NotificationToastProps {
  notification: Notification | null;
  onClose: () => void;
}

const NotificationToast = ({ notification, onClose }: NotificationToastProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const getIcon = () => {
    if (!notification) return <span>⭐</span>;
    if (notification.type === "achievement") return <span>🏆</span>;
    if (notification.type === "badge") return <span>⭐</span>;
    return <span>🔔</span>;
  };

  const getSeverity = () => {
    if (!notification) return "info";
    if (notification.type === "achievement" || notification.type === "award") return "success";
    if (notification.type === "competition") return "warning";
    return "info";
  };

  if (!notification) return null;

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleClose}>
      <Alert
        severity={getSeverity()}
        onClose={handleClose}
        icon={getIcon()}
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
            ✕
          </IconButton>
        }
      >
        <AlertTitle sx={{ fontWeight: "bold" }}>{notification.title}</AlertTitle>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationToast;

