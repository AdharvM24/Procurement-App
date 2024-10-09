import React from "react";
import { CssBaseline } from "@mui/material";
import MainRoute from "./routes/MainRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return(
    <Provider store={store}>
      <CssBaseline />
      <MainRoute />
    </Provider>
  );
};
export default App;
