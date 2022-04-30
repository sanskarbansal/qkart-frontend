import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useCallback } from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const { push } = useHistory();
  const username = localStorage.getItem("username");
  const logout = useCallback(() => {
    localStorage.clear();
    push("/");
  }, [push]);
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => push("/")}
          variant="text"
        >
          Back to explore
        </Button>
      ) : username === null ? (
        <Stack direction="row">
          <Button onClick={() => push("/login")}>Login</Button>
          <Button onClick={() => push("/register")} variant="contained">
            Register
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Avatar src="avatar.png" alt={username} />
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
          >
            {username}
          </Box>
          <Button onClick={logout}>Logout</Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
