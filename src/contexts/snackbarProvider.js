import React from "react";

export const snackbarContext = React.createContext();

const SnackbarProvider = (props) => {
  const [snackbar, setSnackbar] = React.useState({ message: "", severity: "" });
  return (
    <snackbarContext.Provider value={[snackbar, setSnackbar]}>
      {props.children}
    </snackbarContext.Provider>
  );
};

export default SnackbarProvider;
