import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip";

export default function AttributeComp(props) {
  return (
    <React.Fragment>
      <InputLabel>{props.label}</InputLabel>
      <Table>
        <TableBody>
          {props.data?.map((attribute, index) => (
            <TableRow key={attribute.name}>
              <TableCell>
                <TextField
                  value={attribute.name}
                  name="name"
                  variant="standard"
                  fullWidth
                  // onChange={(event) => props.onchangeAttributeName(event)}
                />
              </TableCell>
              <TableCell>
                {/* <TextField */}
                  {/* // value={attribute.values} */}
                  {/* // name="name" */}
                  {/* // variant="standard" */}
                  {/* fullWidth */}
                  {/* // onChange={(event) => props.onchangeAttributeValues(event)} */}
                {/* // > */}
                  {attribute.values?.map(value=>(
                    <Chip label={value} key={value}/>
                  ))}
                {/* </TextField> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}