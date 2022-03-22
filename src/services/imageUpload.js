import React from "react";
import { projectStorage } from "../config/firebaseConfig";

const ImageUpload = ({
  file,
  error,
  setUpload,
  detail: [details, setDetails],
  profilepicture,
}) => {
  React.useEffect(() => {
    //deleting the old file if exists
    if (profilepicture) {
      const storageRef = projectStorage.refFromURL(profilepicture);
      storageRef
        .delete()
        .then(() =>
          console
            .log("File got deleted successfully")
            .catch((err) => console.log(err))
        );
    }
    if (file) {
      const storageRef = projectStorage.ref(file.name);
      storageRef.put().on(
        "state_changed",
        (snap) => console.log(Object.keys(snap)),
        (err) => console.log(err),
        async () => {
          const url = await storageRef.getDownloadURL();
          setDetails({ ...details, profilepicture: url });
        }
      );
      setUpload(false);
    }
  }, [file, details, setDetails, setUpload, profilepicture]);
  return null;
};

export default ImageUpload;
