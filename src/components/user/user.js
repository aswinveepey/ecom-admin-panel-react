//library imports
import React, { Suspense } from "react";
// import queryString from "query-string";
//relative imports
import Scaffold from "../common/scaffold";
import UserCardList from './usercardlist'
//material ui core imports
// import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'

const UserDetailComp = React.lazy(() => import("./userdetail"));
const UserNewComp = React.lazy(() => import("./usernew"));

export default function UserComp(props) {
  
  const [selectedUserId, setSelectedUserId] = React.useState();
  const [newUser, setNewUser] = React.useState(false);

  const selectUser = (userId)=>{
    setNewUser(false)
    setSelectedUserId(userId)
  }

  const newUserClick = (event) => {
    event.preventDefault()
    setNewUser(true);
    setSelectedUserId(null);
  };

  React.useEffect(()=>{
    props?.match?.params?.userId && setSelectedUserId(props.match.params.userId)
  },[props])

  //render
    return (
      <React.Fragment>
        <Scaffold title="Users">
          <Grid container direction="row" spacing={2}>
            <Grid item lg={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                aria-label="Add"
                onClick={newUserClick}
              >
                {"New User"}
              </Button>
              <UserCardList onSelect={selectUser} />
            </Grid>
            <Grid item lg={10}>
              {newUser && (
                <Suspense fallback={<div>Loading...</div>}>
                  <UserNewComp />
                </Suspense>
              )}
              {selectedUserId && (
                <Suspense fallback={<div>Loading...</div>}>
                  <UserDetailComp userId={selectedUserId} />
                </Suspense>
              )}
            </Grid>
          </Grid>
        </Scaffold>
      </React.Fragment>
    );
  }