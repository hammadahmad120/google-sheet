import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Typography,
  makeStyles,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useAxios from "utils/useAxois";
import Question from "components/test/Question";
import { PATH_RESULT } from "constants/paths";
import {
  FINISH_TEST,
  NEXT_QUESTION,
  PREVIOUS_QUESTION,
} from "constants/buttonsPreview";
import { ERROR_ALERT, WARNING_ALERT } from "constants/alertTypes";
import { ERROR_MESSAGE, OPTIONS_REQUIRED } from "constants/popupAlertsMessages";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Test(props) {
  const classes = useStyles();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [alertState, setAlertState] = useState({
    message: null,
    alertType: null,
  });

  const {
    response: questions,
    error,
    loading,
  } = useAxios({ url: "questions", method: "get" });

  const isLastQuestion = () => {
    return currentQuestion + 1 == questions.length;
  };

  const isAnswerd = () => {
    return !!answers[questions[currentQuestion].id];
  };

  const generateResult = () => {
    sessionStorage.setItem("answers", JSON.stringify(answers));
    props.history.push(`${PATH_RESULT}`);
  };

  const showAlert = (message, alertType) => {
    if (!alertState.message) {
      setAlertState({ message, alertType });
      setTimeout(() => {
        setAlertState({ alertType: null, message: null });
      }, 3000);
    }
  };
  useEffect(() => {
    if (error) showAlert(ERROR_MESSAGE, ERROR_ALERT);
  }, [error]);

  return (
    <Container component="main" maxWidth="md">
      {alertState.message && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
        >
          <Alert severity={alertState.alertType}>{alertState.message}</Alert>
        </Snackbar>
      )}
      <Paper elevation={3} className={classes.paper}>
        {loading ? <CircularProgress size={20} /> : null}
        {!loading && questions ? (
          <>
            <Typography variant="h6">
              PsycCheck - Are you an introvert or an extrovert?
            </Typography>
            <Typography variant="subtitle1">
              {`Question ${currentQuestion + 1}/${questions.length}`}
            </Typography>
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              handleSelection={(change) => {
                const answersClone = { ...answers };
                answersClone[questions[currentQuestion].id] = change;
                setAnswers(answersClone);
              }}
              selectedOptionId={answers[questions[currentQuestion].id]}
            />
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                  }}
                  disabled={currentQuestion == 0}
                >
                  {PREVIOUS_QUESTION}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!isAnswerd())
                      showAlert(OPTIONS_REQUIRED, WARNING_ALERT);
                    else if (isLastQuestion()) generateResult();
                    else setCurrentQuestion(currentQuestion + 1);
                  }}
                >
                  {isLastQuestion() ? FINISH_TEST : NEXT_QUESTION}
                </Button>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Paper>
    </Container>
  );
}

export default withRouter(Test);
