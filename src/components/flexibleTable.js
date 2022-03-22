import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import DeleteContact from "../services/deleteContact";
import EditContact from "../services/editContact";
import FlexibleDialog from "./flexibleDialog";
import content from "../form.json";
import image from "../assets/user.png";

const FlexibleTable = (props) => {
  const { data } = props;
  const [edit, setEdit] = React.useState(false);
  const [editDetails, setEditDetails] = React.useState(null);
  const [del, setDel] = React.useState(false);
  const [editDialog, setEditDialog] = React.useState(false);
  const [delDialog, setDelDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [editId, setEditId] = React.useState("");
  const [editCount, setEditCount] = React.useState(0);
  const [delCount, setDelCount] = React.useState(0);

  const handleDelDialog = (identity) => {
    setDelDialog(!delDialog);
    setDeleteId(identity);
  };
  const handleEditDialog = (identity) => {
    setEditDialog(!editDialog);
    setEditId(identity);
  };
  const property = [
    "SNo",
    "name",
    "phone",
    "type",
    "iswhatsapp",
    "profilepicture",
    "action",
  ];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {property
                .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
                .map((heading, i) => (
                  <TableCell key={i}>{heading}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {property.map((item, j) => (
                  <TableCell key={i + j}>
                    {typeof row[item] === "boolean" ? (
                      !row[item] ? (
                        "No"
                      ) : (
                        "Yes"
                      )
                    ) : item === "profilepicture" ? (
                      row[item] === "" ? (
                        <img
                          src={image}
                          alt="dp"
                          style={{
                            height: "45px",
                            width: "45px",
                            border: "1px solid black",
                          }}
                        />
                      ) : (
                        <img
                          src={row[item]}
                          alt="dp"
                          style={{
                            height: "45px",
                            width: "45px",
                            border: "1px solid black",
                          }}
                        />
                      )
                    ) : item === "SNo" ? (
                      i + 1
                    ) : item === "action" ? (
                      <div>
                        {row[item].map((actions) => (
                          <>
                            <IconButton
                              onClick={() =>
                                actions === "edit"
                                  ? handleEditDialog(row["id"])
                                  : handleDelDialog(row["id"])
                              }
                            >
                              {actions === "edit" ? (
                                <EditTwoToneIcon color="primary" />
                              ) : (
                                <DeleteForeverTwoToneIcon color="secondary" />
                              )}
                            </IconButton>
                          </>
                        ))}
                        {!editDialog ? null : (
                          <FlexibleDialog
                            title="EDIT CONTACT"
                            dialogopen={editDialog}
                            setdialogopen={setEditDialog}
                            content={content.add}
                            input={{ setState: setEdit, id: editId }}
                            edit={[editDetails, setEditDetails]}
                            data={row}
                          />
                        )}
                        {!delDialog ? null : (
                          <FlexibleDialog
                            title="DELETE CONTACT"
                            dialogopen={delDialog}
                            setdialogopen={setDelDialog}
                            content={content.delete}
                            input={{ setState: setDel, id: deleteId }}
                          />
                        )}
                        {edit && row["id"] === editId && editCount < 1 ? (
                          <EditContact
                            details={editDetails}
                            id={editId}
                            input={{
                              collection: "contact",
                              url: row["profilepicture"],
                            }}
                            setEdit={setEdit}
                            setEditCount={setEditCount}
                          />
                        ) : null}
                        {del && row["id"] === deleteId && delCount < 1 ? (
                          <DeleteContact
                            id={deleteId}
                            input={{
                              collection: "contact",
                              url: row["profilepicture"],
                            }}
                            setDel={setDel}
                            setDelCount={setDelCount}
                          />
                        ) : null}
                      </div>
                    ) : (
                      row[item]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FlexibleTable;
