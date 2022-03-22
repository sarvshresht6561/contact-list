import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Checkbox,
  TextField,
  Select,
  InputLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import FlexibleButton from "./flexibleButton";
import ImageUpload from "../services/imageUpload";
import InsertContact from "../services/insertContact";
import { snackbarContext } from "../contexts/snackbarProvider";

const FlexibleDialog = (props) => {
  const [snackbar, setSnackbar] = React.useContext(snackbarContext);
  const { dialogopen, setdialogopen, data } = props;
  const handleClose = () => setdialogopen(false);
  let obj = {};

  if (props.content.label === "add" || props.content.label === "edit") {
    for (let i of props.content.content) obj[i.label.toLowerCase()] = "";

    for (let i of Object.keys(obj)) {
      if (i === "iswhatsapp") obj[i] = false;
    }
  } //end of if for insert entry

  const handleTextChange = (e, item) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e, item) => {
    setChecked(!checked);
    setDetails((prev) => ({ ...prev, [item.label.toLowerCase()]: !checked }));
  };

  const cleanDetails = (details) => {
    const obj = {};
    for (let i in details) {
      if (details[i]) obj[i] = details[i];
    }
    return obj;
  };

  const [details, setDetails] = React.useState(obj);
  const [checked, setChecked] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [upload, setUpload] = React.useState(false);
  const [insert, setInsert] = React.useState(false);

  const handleUpload = () => setUpload(true);

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (f && ["image/jpeg", "image/png"].includes(f.type)) setFile(f);
    else {
      setFile(null);
      setError("Please select either jpg or png files.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.title === "ADD CONTACT") {
      setInsert(true);
    } else {
      if (props.input && props.edit) {
        props.input.setState(true);
        props.edit[1](cleanDetails(details));
      }
    }
    handleClose();
  };

  const handleOK = () => {
    if (props.input) {
      const { setState } = props.input;
      setState(true);
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={dialogopen} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.content.content.map((item, i) => {
            const { title, type } = item;
            return (
              <div key={i}>
                <DialogContentText>{title}</DialogContentText>
                {type === "text" ? (
                  <TextField
                    {...item}
                    variant="outlined"
                    onChange={(e) => handleTextChange(e, item)}
                    value={details[item.name]}
                  />
                ) : type === "checkbox" ? (
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => handleCheckboxChange(e, item)}
                          value={details[item.name]}
                        />
                      }
                      label={i.label}
                    />
                  </FormGroup>
                ) : type === "select" ? (
                  <InputLabel htmlFor="type-number">
                    <Select
                      native
                      value={details[item.name]}
                      onChange={(e) => handleTextChange(e, item)}
                      inputProps={{
                        name: item.name,
                        id: "type-number",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {item.value.map((i, index) => (
                        <option value={i} key={index}>
                          {i}
                        </option>
                      ))}
                    </Select>
                  </InputLabel>
                ) : type === "file" ? (
                  <div>
                    <input
                      id="contained-button-file"
                      accept="image/*"
                      type="file"
                      name={item.name}
                      onChange={handleImage}
                    />
                    {!error ? null : <h1 style={{ color: "red" }}>{error}</h1>}
                    <center>
                      <FlexibleButton
                        variant="contained"
                        color="primary"
                        component="span"
                        name="Upload"
                        onClick={handleUpload}
                      />
                      {upload ? (
                        props.content.label === "add" ? (
                          <ImageUpload
                            file={file}
                            error={error}
                            setUpload={setUpload}
                            detail={[details, setDetails]}
                          />
                        ) : (
                          <ImageUpload
                            file={file}
                            error={error}
                            setUpload={setUpload}
                            detail={[details, setDetails]}
                            profilePicture={data.profilepicture}
                          />
                        )
                      ) : null}
                    </center>
                  </div>
                ) : null}
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          {props.content.action.map((item, i) => (
            <React.Fragment key={i}>
              <FlexibleButton
                variant="outlined"
                color={item === "cancel" ? "secondary" : "primary"}
                onClick={(e) =>
                  item === "cancel"
                    ? handleClose()
                    : item === "submit"
                    ? handleSubmit(e)
                    : handleOK()
                }
                name={item}
              />
            </React.Fragment>
          ))}
          {!insert ? null : (
            <>
              <InsertContact
                details={details}
                setInsert={setInsert}
                setSnackbar={setSnackbar}
                snackbar={snackbar}
              />
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlexibleDialog;
