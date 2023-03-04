import React from "react";
import {
  Button,
  Typography,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
import { START_TEST_BUTTON } from "../../constants/buttonsPreview";
import { withRouter } from "react-router-dom";
import { PATH_TEST } from "constants/paths";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  startTestButton: {
    margin: theme.spacing(3, 0, 2),
  },
  subHeading: {},
}));

function Home(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4">Welcome to PsycTest</Typography>
        <Typography>Are you an introvert or an extrovert?</Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.startTestButton}
          onClick={() => {
            props.history.push(PATH_TEST);
          }}
        >
          {START_TEST_BUTTON}
        </Button>
      </Paper>
    </Container>
  );
}

export default withRouter(Home);
