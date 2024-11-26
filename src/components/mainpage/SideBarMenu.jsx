import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";

const SidebarMenu = () => {
  const [open, setOpen] = useState(true);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
        <ListItemText primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
          {categories.map((category, index) => (
            <ListItemButton sx={{ pl: 4 }} key={index}>
              <ListItemIcon>
                <CategoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={category.name} /> {/* Adjust property based on your API response */}
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarMenu;
