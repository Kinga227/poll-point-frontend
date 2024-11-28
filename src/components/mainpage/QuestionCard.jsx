import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { getMyAnswer } from "../../api/answerApi";

const voteSubject = new Subject();

const QuestionCard = ({ question, onAnswer, userId }) => {

  const [agree, setAgree] = useState(0)
  const [disagree, setDisagree] = useState(0)
  const [myAnswer, setMyAnswer] = useState([])

  useEffect(() => {
    setAgree(question.trueCount);
    setDisagree(question.falseCount);

    const fetchMyAnswer = async () => {
      setAgree(question.trueCount);
      setDisagree(question.falseCount);
      try {
        const my = await getMyAnswer({ userId: userId, questionId: question.id });
        setMyAnswer(my);
        console.log(my);
      } catch (error) {
        console.error("Failed to fetch my answer:", error);
      }
    };

    fetchMyAnswer();

  }, [question, userId]);

  useEffect(() => {
    const subscription = voteSubject
      .pipe(
        filter(({ id }) => id === question.id),
        filter(({ hasVoted }) => !hasVoted) 
      )
      .subscribe(({ id, answer }) => {
        onAnswer(id, answer);
      });

    return () => subscription.unsubscribe();
  }, [onAnswer, userId, question.id]);

  const hasVoted = myAnswer.length > 0;
  const votedAnswer = hasVoted ? myAnswer[0].answer : null;

  const handleVote = (answer) => {
    voteSubject.next({ id: question.id, answer, hasVoted });
  };

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
            sx={{ height: 56, bgcolor: hasVoted && votedAnswer === 1 ? "#5c0003" : "#757876", fontWeight: "bold" }}
            onClick={() => handleVote(true)}
          >
            Agree
          </Button>
          <Button
            fullWidth
            sx={{ height: 56, bgcolor: hasVoted && votedAnswer === 0 ? "#5c0003" : "#757876", fontWeight: "bold" }}
            onClick={() => handleVote(false)}
          >
            Disagree
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
