import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const SidebarMenu = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        position: "fixed",
        top: 64,
        left: 0,
        bgcolor: "#ebebed",
        width: "100%",
        maxWidth: 360,
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
      component="nav"
    >
      <ListItemButton>
        <ListItemIcon>
          <PersonSearchOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="My questions" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <QuestionMarkOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Questions" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"].map((category, index) => (
            <ListItemButton sx={{ pl: 4 }} key={index}>
              <ListItemIcon>
                <CategoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarMenu;
