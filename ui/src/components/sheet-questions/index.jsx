import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  heading: {
    background: 'yellow'
  },
  questionsSection:{
    marginTop: '24px'
  }
}));

const SheetQuestions= ({questions}) => {
  const classes = useStyles();

  return (
    <>
    <Typography variant="h6"> <span className={classes.heading}>QUESTIONS</span></Typography>
    <div className={classes.questionsSection}>
        {Object.keys(questions).map((question) => (
            <div>
                <b>{question}</b>: {questions[question]}
            </div>
            ))}
    </div>
    </>
  );
}

export default SheetQuestions;