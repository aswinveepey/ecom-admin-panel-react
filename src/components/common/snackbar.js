import React from 'react'

import {IconButton, Snackbar} from '@material-ui/core'
import CloseIcon from "@material-ui/icons/Close"

class SnackBarComp extends React.Component {
  state = {
    snackbaropen: this.props.snackbaropen,
    message: this.props.message,
  };
  // check and update changes based on props change from parent
  componentDidUpdate(prevProps) {
    if (!(this.props.snackbaropen === prevProps.snackbaropen)) {
      this.setState({snackbaropen: this.props.snackbaropen, message: this.props.message});
    }
  }
  //handle snackbar close click
  handleSnackBarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.state.snackbaropen}
        autoHideDuration={6000}
        onClose={this.handleSnackBarClose}
        message={this.state.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    );
  }
}

export default SnackBarComp;