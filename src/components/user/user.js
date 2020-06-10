import React from 'react'
import AppBarComp from "../common/appbar";
import UserCardList from './usercardlist'
import UserDetailComp from './userdetail'
import UserNewComp from "./usernew";
import {
  LinearProgress,
  Grid,
  Paper,
  Typography,
  Divider,
  Fab,
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
    selectedId: null,
    newuserflag: false
  };
  selectUser(userId){
    console.log(userId)
    this.setState({ selectedId: userId, newuserflag: false });
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
              <Grid item lg={2} sm={4} md={4} xs={4}>
                <UserCardList onSelect={this.selectUser} />
                <Fab
                  color="primary"
                  aria-label="add"
                  className="fab"
                  onClick={() => {
                    this.setState({ newuserflag: true });
                  }}
                >
                  <AddIcon />
                </Fab>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item lg={8} sm={6} md={6} xs={6}>
                {!this.state.newuserflag && (
                  <UserDetailComp userId={this.state.selectedId} />
                )}
                {this.state.newuserflag && (
                  <UserNewComp/>
                )}
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}

export default UserComp;