import React from 'react'
import Paper from '@material-ui/core/Paper'

class UserNewComp extends React.Component{
  render(){
    return(
      <React.Fragment>
        <Paper
            className="paper-box"
            variant="elevation"
            elevation={24}
          ></Paper>
      </React.Fragment>
    )
  }
}

export default UserNewComp;