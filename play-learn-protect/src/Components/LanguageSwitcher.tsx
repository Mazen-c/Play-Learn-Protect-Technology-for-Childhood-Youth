import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.body.dir = lang === "ar" ? "rtl" : "ltr"; // Handle RTL for Arabic
  };

  return (
    <ButtonGroup variant="contained" color="secondary">
      <Button
        onClick={() => changeLanguage("en")}
        disabled={i18n.language === "en"}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage("ar")}
        disabled={i18n.language === "ar"}
      >
        AR
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
