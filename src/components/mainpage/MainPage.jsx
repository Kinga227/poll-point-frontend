import React from "react";
import Box from "@mui/material/Box";
import AppBarComponent from "./AppBarComponent";
import SidebarMenu from "./SidebarMenu";
import QuestionCard from "./QuestionCard";

const MainPage = () => {
  const questions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
    "Aliquam sit amet ipsum euismod lacinia?",
    "Vestibulum euismod nisl eu eros vehicula, at condimentum mi tincidunt?",
    "Etiam gravida libero ac elit tristique, et dictum arcu euismod?",
    "Praesent viverra felis sed leo tincidunt gravida?"
  ];

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
    </>
  );
};

export default MainPage;
