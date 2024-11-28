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

const SidebarMenu = ({ onFilterChange }) => {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);

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

  const handleToggleFilter = () => {
    const newFilter = !filterToggle ? "myQuestions" : "all";
    onFilterChange(newFilter);
    setFilterToggle(!filterToggle);
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
      <ListItemButton onClick={handleToggleFilter}>
        <ListItemIcon>
          <PersonSearchOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={filterToggle ? "All questions" : "My questions"} />
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
            <ListItemButton
              sx={{ pl: 4 }}
              key={index}
              onClick={() => onFilterChange('category-' + category.id)}
            >
              <ListItemIcon>
                <CategoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarMenu;
