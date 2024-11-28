import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import React, { useEffect, useState, useMemo } from "react";
import { webSocket } from "rxjs/webSocket";
import { getAllCategories } from "../../api/categoryApi";
import AppBarComponent from "./AppBarComponent";
import QuestionCard from "./QuestionCard";
import SidebarMenu from "./SideBarMenu";

const subject = webSocket({
  url: "ws://localhost:8081/",
  openObserver: {
    next: () => console.log("WebSocket connection established"),
  },
  closeObserver: {
    next: () => console.log("WebSocket connection closed"),
  },
});

const MainPage = () => {
  const id = Cookies.get("userId");
  const userId = id ? Number(id) : null;

  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [open, setOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [filter, setFilter] = useState("all");

  const displayedQuestions = useMemo(() => {
    if (filter === "myQuestions") {
      return questions.filter((q) => q.userId === userId);
    } else if (filter === "all") {
      return questions;
    } else if (filter.startsWith("category-")) {
      const categoryId = parseInt(filter.split("-")[1], 10);
      return questions.filter((q) => q.catId === categoryId);
    }
    return questions;
  }, [filter, questions, userId]);

  const handleFilterChange = (FilterType) => {
    setFilter(FilterType);
  };

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      console.log(categories);
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const subscription = subject.subscribe({
      next: (msg) => {
        console.log("Received message:", msg);

        if (msg.type === "question") {
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
              id: msg.question.id,
              text: msg.question.text,
              userId: msg.question.userId,
              catId: msg.question.catId,
              trueCount: msg.trueCount,
              falseCount: msg.falseCount,
            },
          ]);
        } else if (msg.type === "answer") {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question.id === msg.questionId
                ? {
                    ...question,
                    trueCount: msg.trueCount,
                    falseCount: msg.falseCount,
                  }
                : question
            )
          );
        }
      },
      error: (err) => console.error("WebSocket Error:", err),
      complete: () => console.log("WebSocket connection closed"),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewQuestion("");
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && selectedCategory) {
      const question = {
        type: "message",
        text: newQuestion,
        category: selectedCategory,
        userId: userId,
      };

      console.log(question);

      subject.next(question);

      handleClose();
    }
  };

  const handleAnswer = (questionId, answer) => {
    if (userId) {
      const answerData = {
        type: "answer",
        questionId,
        userId,
        answer,
      };
      subject.next(answerData);
    }
  };

  return (
    <>
      <AppBarComponent />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SidebarMenu onFilterChange={handleFilterChange} />
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
          {displayedQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              onAnswer={handleAnswer}
            />
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
              <MenuItem key={category.id} value={category.id}>
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
