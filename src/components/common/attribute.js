import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  attrvalues: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function AttributeComp(props) {
  const classes = useStyles();
  const handleAttrValueDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return (
    <React.Fragment>
      <InputLabel>{props.label}</InputLabel>
      <Table>
        <TableBody>
          {props.data?.map((attribute, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={attribute.name}
                  data-index={index}
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) =>
                    props.onchangeAttributeName(event, index)
                  }
                />
              </TableCell>
              <TableCell className={classes.attrvalues}>
                {attribute.values?.map((value) => (
                  <Chip
                    label={value}
                    key={value}
                    onDelete={handleAttrValueDelete}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}