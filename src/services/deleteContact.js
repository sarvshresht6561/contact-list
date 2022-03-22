import React from "react";
import { projectFirestore, projectStorage } from "../config/firebaseConfig";

const DeleteContact = ({ id, input, setDel, setDelCount }) => {
  React.useEffect(() => {
    const { collection, url } = input;
    //deleting the file if uploaded
    if (url) {
      const storageRef = projectStorage.refFromURL(url);
      storageRef
        .delete()
        .then(() =>
          console
            .log("File got deleted successfully")
            .catch((err) => console.log(err))
        );
    }
    //deleting the record
    projectFirestore
      .collection(collection)
      .doc(id)
      .delete()
      .then((id) => console.log(`Document of id ${id} is deleted successfully`))
      .catch((err) => console.log(err));
    setDel(false);
    setDelCount((prev) => prev + 1);
  }, [id, input, setDel, setDelCount]);
  return null;
};

export default DeleteContact;
