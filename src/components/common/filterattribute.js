import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
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

export default function FilterAttributeComp(props) {
  const classes = useStyles();
  const [attributeOptions, setAttributeOptions] = React.useState([])
  const [attributeValueOptions, setAttributeValueOptions] = React.useState([])

  React.useEffect(() => {
    setAttributeOptions(
      props.selectData?.map((item) => item.name)
    );
  }, [props.selectData]);
  
  React.useEffect(()=>{
    let filterValues = props.selectData?.map((item) => item.values)

    let merged = [].concat.apply([], filterValues);

    setAttributeValueOptions(merged);
  },[])

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
            <TableCell>Value</TableCell>
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
                <Select
                  native
                  value={attribute.name || ""}
                  onChange={(event) => props.onchangeAttribute(event, index)}
                  fullWidth
                  inputProps={{
                    name: "name",
                  }}
                >
                  {attributeOptions?.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </TableCell>
              <TableCell className={classes.attrvalues}>
                <Select
                  native
                  value={attribute.value || ""}
                  data-index={index}
                  onChange={(event) => props.onchangeAttribute(event, index)}
                  fullWidth
                  inputProps={{
                    name: "value",
                  }}
                >
                  {attributeValueOptions?.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {/* <TextField
                  value={attribute.value || ""}
                  data-index={index}
                  name="value"
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.onchangeAttribute(event, index)}
                /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
