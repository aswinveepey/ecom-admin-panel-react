//library imports
import React, { Suspense } from "react";
//relative imports
import UserCardList from './usercardlist'
//material ui core imports
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

const UserDetailComp = React.lazy(() => import("./userdetail"));
const UserNewComp = React.lazy(() => import("./usernew"));

//define styles
const useStyles = makeStyles((theme) => ({
  userComp: {
    marginTop:"10px",
  },
}));

export default function UserComp(props) {

  const classes = useStyles();
  
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
  },[])

  //render
    return (
      <React.Fragment>
        {/* <Scaffold title="Users"> */}
        <Grid
          container
          direction="row"
          spacing={2}
          className={classes.userComp}
        >
          <Grid item>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              aria-label="Add"
              onClick={newUserClick}
            >
              {"New User"}
            </Button>
            <UserCardList onSelect={selectUser} />
            {/* <Divider orientation="vertical" /> */}
          </Grid>
          <Grid item>
            {newUser && (
              <Suspense fallback={<div>Loading...</div>}>
                <UserNewComp />
              </Suspense>
            )}
            {selectedUserId ? (
              <Suspense fallback={<div>Loading...</div>}>
                <UserDetailComp userId={selectedUserId} />
              </Suspense>
            ) : (
              <Typography variant="h6">
                {/* Select a User to see the details */}
              </Typography>
            )}
          </Grid>
        </Grid>
        {/* </Scaffold> */}
      </React.Fragment>
    );
  }