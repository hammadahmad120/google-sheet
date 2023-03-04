import React, { Component } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme  from './utils/theme';
import AppRoutes from "./routes/AppRoutes";
import NavBar from "components/navbar/NavBar";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <AppRoutes user={this.state.user} />
      </ThemeProvider>
    );
  }
}

export default App;
