import React from "react";
import { projectFirestore } from "../config/firebaseConfig";

const EditContact = ({ details, id, input, setEdit, setEditCount }) => {
  console.log("the value of details is: ", details);
  React.useEffect(() => {
    //updating the record entry
    projectFirestore
      .collection("contact")
      .doc(id)
      .update(details)
      .then(() => {
        console.log("Contact updated successfully!");
      })
      .catch((err) => console.log(err));
    setEdit((prev) => !prev);
    setEditCount((prev) => prev + 1);
  }, [details, id, setEdit, setEditCount]);
  return null;
};

export default EditContact;
