import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper:{
    position: 'fixed', bottom: 0, left: 0, right: 0, overflow: 'auto'
  }
}));

const SheetNavigation= ({selectedSheet, changeSelectedSheet, sheets}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
        <BottomNavigation
          showLabels
          value={selectedSheet}
          onChange={(event, newValue) => {
            changeSelectedSheet(newValue);
          }}
        >
          {sheets.map(sheet => <BottomNavigationAction label={sheet.title} value={sheet.title} key={sheet.sheetId}/> )}
        </BottomNavigation>
      </Paper>
  );
}

export default SheetNavigation;