import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const QuestionCard = ({ question, onAnswer }) => {

  const [agree, setAgree] = useState(0)
  const [disagree, setDisagree] = useState(0)
  useEffect(() => {
    setAgree(question.trueCount);
    setDisagree(question.falseCount);
  }, [question]);

  return (
    <Card
      sx={{
        width: "80%",
        textAlign: "center",
        bgcolor: "#ebebed",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {question.text}
        </Typography>
        
        <Typography sx={{ color: 'text.secondary', mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#005c09' }}>
            {agree ?? 0} agrees
          </span>{" "}
          <span style={{ fontWeight: 'bold', color: '#5c0003' }}>
            {disagree ?? 0} disagrees
          </span>
        </Typography>
      </CardContent>
      
      <CardActions>
      <ButtonGroup variant="contained" fullWidth aria-label="Basic button group">
          <Button
            fullWidth
            sx={{ height: 56, bgcolor: "#005c09", fontWeight: "bold" }}
            onClick={() => onAnswer(question.id, true)}
          >
            Agree
          </Button>
          <Button
            fullWidth
            sx={{ height: 56, bgcolor: "#5c0003", fontWeight: "bold" }}
            onClick={() => onAnswer(question.id, false)}
          >
            Disagree
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
