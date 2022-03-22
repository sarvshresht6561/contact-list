import React from "react";
import { projectFirestore } from "../config/firebaseConfig";

const useContacts = (collection) => {
  const [docs, setDocs] = React.useState([]);
  React.useEffect(() => {
    const getContacts = async () => {
      let result = await projectFirestore.collection(collection).get();
      result = result.docs.map((item, i) => ({
        ...item.data(),
        id: item.id,
        SNo: i + 1,
        action: ["edit", "delete"],
      }));
      let n = result.length - 1;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          let a = result[j]["name"].charCodeAt(0),
            b = result[j + 1]["name"].charCodeAt(0);
          a = a >= 97 ? a - 32 : a;
          b = b >= 97 ? b - 32 : b;
          if (a > b) {
            let temp = Object.assign({}, result[j]);
            result[j] = Object.assign(result[j], result[j + 1]);
            result[j + 1] = Object.assign(result[j + 1], temp);
          }
        }
      }
      setDocs(result);
    };
    getContacts();
  }, [collection]);
  return docs;
};

export default useContacts;
