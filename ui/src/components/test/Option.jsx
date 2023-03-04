import React from "react";
import {
  makeStyles,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function Option({ text, isSelected, handleChange }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.paper}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={handleChange}
              color="primary"
            />
          }
          label={text}
        />
      </FormGroup>
    </Paper>
  );
}

export default Option;
