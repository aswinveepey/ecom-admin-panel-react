//library imports
import React from 'react'
// import queryString from "query-string";
//relative imports
import AppBarComp from "../common/appbar";
import UserCardList from './usercardlist'
import UserDetailComp from './userdetail'
import UserNewComp from "./usernew";
import PaperBox from "../common/paperbox"
//material ui core imports
// import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab'
import Tooltip from "@material-ui/core/Tooltip";
//material ui icon imports
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
  componentDidMount(){
    const { userid } = this.props.match.params;
    // const values = queryString.parse(this.props.location.search);
    // values && this.setState({ selectedId: values.userId });
    userid && this.setState({ selectedId: userid });
  }
  //render
  render() {
    return (
      <React.Fragment>
        <AppBarComp title="Users" />
        <PaperBox>
          <Grid
            container
            direction="row"
            spacing={2}
          >
            <Grid item lg={2}>
              {/* <PaperBox> */}
              <Tooltip title="Add User">
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className="adduserfab"
                  onClick={() => {
                    this.setState({ newuserflag: true });
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
              <UserCardList onSelect={this.selectUser} />
              {/* </PaperBox> */}
            </Grid>
            <Grid item lg={10}>
              {/* <PaperBox> */}
              {!this.state.newuserflag && (
                <UserDetailComp userId={this.state.selectedId} />
              )}
              {this.state.newuserflag && <UserNewComp />}
              {/* </PaperBox> */}
            </Grid>
          </Grid>
        </PaperBox>
      </React.Fragment>
    );
  }
}

export default UserComp;