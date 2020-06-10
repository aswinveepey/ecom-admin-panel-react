import React from 'react'
import Paper from '@material-ui/core/Paper'

class UserNewComp extends React.Component{
  handleSubmit = async(event)=>{
    event.preventDefault();
  }
  render(){
    return(
      <React.Fragment>
        <Paper
            className="paper-box"
            variant="elevation"
            elevation={24}
          >
            <form onSubmit={this.handleSubmit}>

            </form>
          </Paper>
      </React.Fragment>
    )
  }
}

export default UserNewComp;