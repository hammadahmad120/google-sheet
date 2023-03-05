import React, { Component } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme  from './utils/theme';
import AppRoutes from "./routes/AppRoutes";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    );
  }
}

export default App;
