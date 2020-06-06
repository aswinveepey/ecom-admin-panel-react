import React from 'react'
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Edit";

class EditCellRenderer extends React.Component{
  render(){
    return (
      <Link to={"/user/" + this.props.value}>
        <VisibilityIcon />
      </Link>
    );
  }
}

export default EditCellRenderer;