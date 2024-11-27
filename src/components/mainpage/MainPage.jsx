import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBarComponent from "./AppBarComponent";
import SidebarMenu from "./SideBarMenu";
import QuestionCard from "./QuestionCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllCategories } from "../../api/categoryApi";

const MainPage = () => {
  const [questions, setQuestions] = useState([
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
    "Aliquam sit amet ipsum euismod lacinia?",
    "Vestibulum euismod nisl eu eros vehicula, at condimentum mi tincidunt?",
    "Etiam gravida libero ac elit tristique, et dictum arcu euismod?",
    "Praesent viverra felis sed leo tincidunt gravida?",
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "elso kat" },
    { id: 2, name: "masodik kat" },
    { id: 3, name: "harmadik kat" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [open, setOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewQuestion("");
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && selectedCategory) {
      setQuestions([...questions, `${newQuestion} (Category: ${selectedCategory})`]);
      handleClose();
    }
  };

  return (
    <>
      <AppBarComponent />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SidebarMenu />
        <Box
          sx={{
            marginLeft: "380px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: 3,
            marginTop: "80px",
            bgcolor: "background.default",
          }}
        >
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </Box>
      </Box>

      <Fab
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#060c40",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2936ab",
          },
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a new question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ marginTop: 3 }}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#060c40">
            Cancel
          </Button>
          <Button
            onClick={handleAddQuestion}
            variant="contained"
            color="primary"
            sx={{ bgcolor: "#060c40", "&:hover": { bgcolor: "#2936ab" } }}
          >
            Add question
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainPage;
