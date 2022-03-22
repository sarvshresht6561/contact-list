import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const FlexibleSnackbar = (props) => {
  const { message, severity } = props;
  const [open, setOpen] = React.useState(true);
  console.log(message, severity);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FlexibleSnackbar;
