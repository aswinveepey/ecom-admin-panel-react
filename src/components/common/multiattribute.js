import React from "react"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles((theme) => ({
  attrbutton:{
    marginTop:"2%"
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

export default function MultiAttributeComp(props) {
  const classes = useStyles();

  const handleAttrValueDelete = (index, chip, chipindex) => {
    props.handleAttrValueDelete(index, chipindex);
  };
  const handleAttrValueAdd = (index, chip, chipindex) => {
    props.handleAttrValueAdd(index, chip);
  };
  const onAttributeDelete = (event, index) => {
    props.onAttributeDelete(event, index);
  }
  const onchangeAttributeName = (index, event) => {
    props.onchangeAttributeName(event, index);
  };
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
                  onClick={onAttributeDelete}
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
                  onChange={onchangeAttributeName.bind(this, index)}
                />
              </TableCell>
              <TableCell className={classes.attrvalues}>
                <ChipInput
                  value={attribute.values}
                  onDelete={handleAttrValueDelete.bind(this, index)}
                  onAdd={handleAttrValueAdd.bind(this, index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}