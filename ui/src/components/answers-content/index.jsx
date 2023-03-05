import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BottomNavigation, BottomNavigationAction, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: '650px',
  },
  heading: {
    background: 'yellow'
  },
  questionsSection:{
    marginTop: '24px'
  }
}));

const AnswersContent= ({sheetData}) => {
  const classes = useStyles();
  const headers = sheetData.data.answersCategoriesPolling;
  const answers = sheetData.data?.answers || {};
  const answerRows = Object.keys(answers).map((answer) => answers[answer]).flat(1);

  return (
    <>
    <Typography variant="h6"> <span className={classes.heading}>ANSWERS</span></Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header,i) => (
              <TableCell key={i}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {answerRows.map((row, i) => (
            <TableRow
              key={i}
            >
              {headers.map((header, index)=>(
                <TableCell key={index}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default AnswersContent;