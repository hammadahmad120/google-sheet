import React, { useState } from "react";
import {
  Button,
  Typography,
  makeStyles,
  Container,
  Paper,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { RETAKE_TEST } from "constants/buttonsPreview";
import { PATH_HOME } from "constants/paths";
import { useEffect } from "react";
import { getResult } from "services/questions";
import { ERROR_MESSAGE } from "constants/popupAlertsMessages";
import { ERROR_ALERT } from "constants/alertTypes";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  retakeButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Result(props) {
  const classes = useStyles();
  const [alertState, setAlertState] = useState({
    message: null,
    alertType: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    var answers = JSON.parse(sessionStorage.getItem("answers"));
    if (!answers) props.history.push(PATH_HOME);
    else {
      getResult(answers)
        .then(({ data: res }) => {
          const { data, status } = res;
          setResult(data);
        })
        .catch((err) => {
          showAlert(ERROR_MESSAGE, ERROR_ALERT);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const showAlert = (message, alertType) => {
    if (!alertState.message) {
      setAlertState({ message, alertType });
      setTimeout(() => {
        setAlertState({ alertType: null, message: null });
      }, 3000);
    }
  };
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
        {isLoading ? <CircularProgress size={20} /> : null}
        {!isLoading && result ? (
          <>
            <Typography variant="h5">Your Result</Typography>
            <Typography variant="h3">{result.message}</Typography>
            <Typography>{result.details}</Typography>
            <Button
              className={classes.retakeButton}
              variant="contained"
              color="primary"
              onClick={() => {
                props.history.push(PATH_HOME);
              }}
            >
              {RETAKE_TEST}
            </Button>
          </>
        ) : null}
      </Paper>
    </Container>
  );
}

export default withRouter(Result);
