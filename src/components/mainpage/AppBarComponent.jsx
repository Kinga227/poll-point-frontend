import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../api/userApi';

const AppBarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      Cookies.remove("userId");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#060c40" }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Arial, sans-serif",
              fontWeight: "semibold",
              fontSize: "1.7rem",
            }}
          >
            PollPoint
          </Typography>
          <LogoutOutlinedIcon />
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarComponent;
