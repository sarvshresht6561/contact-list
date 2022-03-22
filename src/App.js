import React from "react";
import { add } from "./form.json";
import FlexibleButton from "./components/flexibleButton";
import FlexibleDialog from "./components/flexibleDialog";
import FlexibleTable from "./components/flexibleTable";
import useContacts from "./hooks/useContacts";
import SnackbarProvider from "./contexts/snackbarProvider";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const docs = useContacts("contact");

  return (
    <div className="App">
      <center>
        <p>
          WELCOME TO THE HOMEPAGE OF CONTACT LISTS APPLICATION. SO WHAT DO YOU
          WANT TO DO??
        </p>
        <br />
        <br />
        <SnackbarProvider>
          {docs.length ? (
            <FlexibleTable data={docs} />
          ) : (
            <h3>NO CONTACTS FOUND!!!</h3>
          )}
          <FlexibleButton
            name="ADD CONTACT"
            variant="outlined"
            color="primary"
            dialogopen={[open, setOpen]}
            onClick={handleOpen}
          />
          <FlexibleDialog
            dialogopen={open}
            title="ADD CONTACT"
            setdialogopen={setOpen}
            content={add}
          />
        </SnackbarProvider>
      </center>
    </div>
  );
}

export default App;
