import React from 'react'
import AppBarComp from "../common/appbar";
import UserCardList from './usercardlist'
import UserDetailComp from './userdetail'
import {
  LinearProgress,
  Grid,
  Paper,
  Typography,
  Divider,
  Fab
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
class UserComp extends React.Component {
  constructor(props){
    super(props);
    this.selectUser = this.selectUser.bind(this);
  }
  //declare initial states
  state = {
    fetchstatus: "fetched",
    selectedId: "",
  };
  selectUser(userId){
    this.setState({ selectedId: userId });
  }
  //render
  render() {
    return (
      <div>
        <AppBarComp title="Users" />
        {this.state.fetchstatus === "loading" && (
          <LinearProgress color="secondary" />
        )}
        {this.state.fetchstatus === "fetched" && (
          <Paper className="paper-container">
            <Grid container direction="row" spacing={0}>
              <Grid item lg={3} sm={2}>
                <UserCardList onSelect={this.selectUser} />
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <UserDetailComp userId={this.state.selectedId} />
              </Grid>
            </Grid>
            {/* <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab> */}
          </Paper>
        )}
      </div>
    );
  }
}

export default UserComp;