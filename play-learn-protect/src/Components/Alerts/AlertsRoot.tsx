import React from "react";
import SeriousAlertModal from "./AlertModal";
import AlertBubble from "./AlertBubble";

const AlertsRoot: React.FC = () => {
  return (
    <>
      <SeriousAlertModal />
      <AlertBubble />
    </>
  );
};

export default AlertsRoot;
