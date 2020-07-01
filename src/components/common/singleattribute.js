import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  attrbutton: {
    marginTop: "2%",
  },
  attrvalues: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function SingleAttributeComp(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <InputLabel>{props.label}</InputLabel>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={props.onAttributeAdd}
        className={classes.attrbutton}
      >
        Add attribute
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Attribute</TableCell>
            <TableCell>Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((attribute, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={(event) => {
                    props.onAttributeDelete(event, index);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                <TextField
                  value={attribute.name}
                  data-index={index}
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) =>
                    props.onchangeAttribute(event, index)
                  }
                />
              </TableCell>
              <TableCell className={classes.attrvalues}>
                <TextField
                  value={attribute.name}
                  data-index={index}
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) =>
                    props.onchangeAttribute(event, index)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
