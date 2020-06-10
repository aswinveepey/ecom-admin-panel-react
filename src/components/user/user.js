import React from 'react'
import AppBarComp from "../common/appbar";
import UserCardList from './usercardlist'
import UserDetailComp from './userdetail'
import UserNewComp from "./usernew";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from '@material-ui/core/Fab'
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
    this.setState({ selectedId: userId, newuserflag: false });
  }
  //render
  render() {
    return (
      <div className='body-class'>
        <AppBarComp title="Users" />
        {this.state.fetchstatus === "loading" && (
          <LinearProgress color="secondary" />
        )}
        {this.state.fetchstatus === "fetched" && (
          <Paper className="paper-container" >
            <Grid container direction="row" spacing={0}>
              <Grid item lg={2} sm={3} md={3} xs={4}>
                <Fab
                  size='small'
                  color="secondary"
                  aria-label="add"
                  className="fab"
                  onClick={() => {
                    this.setState({ newuserflag: true });
                  }}
                >
                  <AddIcon />
                </Fab>
                <UserCardList onSelect={this.selectUser} />
              </Grid>
              {/* <Divider orientation="vertical" flexItem={true} /> */}
              <Grid item lg={9} sm={8} md={8} xs={7}>
                {!this.state.newuserflag && (
                  <UserDetailComp userId={this.state.selectedId} />
                )}
                {this.state.newuserflag && <UserNewComp />}
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}

export default UserComp;