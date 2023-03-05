import React, { Suspense, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
const Sheet = lazy(() => import("../containers/sheets/Sheet"));

const useStyles = makeStyles((theme) => ({
  fallback: {
    margin: theme.spacing(8),
  },
}));

const AppRoutes = () => {
  const classes = useStyles();

  return (
    <Suspense
      fallback={
        <Grid container justifyContent="center" className={classes.fallback}>
          <CircularProgress size={40} />
        </Grid>
      }
    >
      <Switch>
        <Route path="/sheets" exact component={Sheet} />
        <Redirect to="/sheets" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
