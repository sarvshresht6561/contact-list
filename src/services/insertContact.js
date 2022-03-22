import React from "react";
import { projectFirestore } from "../config/firebaseConfig";

const InsertContact = (props) => {
  const { details, setInsert, setSnackbar } = props;
  React.useEffect(() => {
    projectFirestore
      .collection("contact")
      .doc()
      .set(details)
      .then(() =>
        setSnackbar((prev) => {
          return {
            ...prev,
            message: "Contact created successfully",
            severity: "success",
          };
        })
      )
      .catch((err) =>
        setSnackbar((prev) => ({
          ...prev,
          message: err.message,
          severity: "error",
        }))
      );
    setInsert((prev) => !prev);
  }, [details, setSnackbar, setInsert]);
  return null;
};

export default InsertContact;
