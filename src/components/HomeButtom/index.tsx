// src/components/HomeButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

type HomeButtonProps = {
  label?: string; // texto del botón, opcional
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
};

export const HomeButton: React.FC<HomeButtonProps> = ({
  label = "Home",
  fullWidth = false,
  variant = "contained",
  color = "primary",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
