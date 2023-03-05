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
import { useEffect } from "react";
import { getSheets, getSheetByName } from "services/sheets";
import { ERROR_MESSAGE } from "constants/popupAlertsMessages";
import { ERROR_ALERT } from "constants/alertTypes";
import { Alert } from "@material-ui/lab";
import SheetNavigation from "components/sheet-navigation";
import SheetQuestions from "components/sheet-questions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  }
}));

const Sheet = (props) => {
  const classes = useStyles();
  const [alertState, setAlertState] = useState({
    message: null,
    alertType: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sheetData, setSheetData] = useState(null);
  const [sheets, setSheets] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState(null);

  const fetchSheets = async () =>{
    setSheets(null);
    try{
      const sheets = (await getSheets()).data?.data;
      if(sheets.length) setSelectedSheet(sheets[0].title);
      setSheets(sheets);
    }catch(err){
      showAlert(ERROR_MESSAGE, ERROR_ALERT);
    }
  }

  const fetchSelectedSheet = async () => {
    setIsLoading(true)
    try{
      const sheetData = (await getSheetByName(selectedSheet)).data?.data;
      setSheetData(sheetData);
      console.log("Result is: --------------", sheetData);
    }catch(err){
      showAlert(ERROR_MESSAGE, ERROR_ALERT);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchSheets();
  }, []);

  useEffect(() => {
    if(!selectedSheet) return;
    fetchSelectedSheet();
  }, [selectedSheet]);

  const changeSheet = (val) =>{
    setSelectedSheet(val);
  }
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
        {isLoading ? <CircularProgress style={{position:'fixed',top:'4%', left:'50%'}} size={15} /> : null}
        {!isLoading && sheetData ? (
          <>
          <SheetQuestions questions={sheetData.data.question} />
            
          </>
        ) : null}
      </Paper>
      { sheets && (<SheetNavigation selectedSheet={selectedSheet} changeSelectedSheet={changeSheet} sheets={sheets} />)}
    </Container>
  );
}

export default withRouter(Sheet);
