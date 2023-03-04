import React, { Suspense, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
const Home = lazy(() => import("../containers/home/Home"));
const Test = lazy(() => import("../containers/test/Test"));
const Result = lazy(() => import("../containers/result/Result"));

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
        <Route path="/home" exact component={Home} />
        <Route path="/test" exact component={Test} />
        <Route path="/result" exact component={Result} />
        <Redirect to="/home" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
