import React from "react";
import {
  Typography,
  makeStyles,
} from "@material-ui/core";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  allRequiredMsg: {
    fontStyle: "italic",
  },
  optionsContainer: {
    marginTop: theme.spacing(2)
  },
}));

function Question({ question, options, selectedOptionId, handleSelection }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.allRequiredMsg}>
        All questions are required
      </Typography>
      <Typography variant="h5">{question}</Typography>
      <div className={classes.optionsContainer}>
        {options.map((entry) => {
          return (
            <Option
              text={entry.option}
              isSelected={entry.id == selectedOptionId}
              handleChange={() => {
                handleSelection(entry.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;
