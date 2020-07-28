import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase"
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
import UserApi from "../../../api/user";

//define styles
const useStyles = makeStyles((theme) => ({
  userItem: {
    marginTop:"10px",
    marginBottom:"10px",
    marginRight:"10px"
  },
}));

export default function UserCardList(props) {
  const classes = useStyles();
  const userApi = new UserApi();

  const [userData, setUserData] = React.useState([]);
  const [fetchStatus, setFetchStatus] = React.useState("loading");
  const [selectedId, setSelectedId] = React.useState();

  React.useEffect(() => {
    setFetchStatus("loading");
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    userApi.getUsers(signal).then((data) => {
      setUserData(data);
      setFetchStatus("fetched");
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleCardClick = async (userId, e) => {
    e.preventDefault();
    setSelectedId(userId);
    await props.onSelect(userId);
  };
  return (
    <React.Fragment>
      {/* <Paper className="paper-box" variant="elevation" elvation={1}> */}
        <Grid container direction="column" wrap="nowrap" justify="flex-start">
          {fetchStatus === "fetched" &&
            userData?.map((data) => {
              return (
                <ButtonBase
                  key={data._id}
                  onClick={handleCardClick.bind(this, data._id)}
                >
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      justify="flex-start"
                      className={classes.userItem}
                    >
                      <Grid item>
                        <Avatar>{data.firstname[0] + data.lastname[0]}</Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {data.firstname}&nbsp;{data.lastname}
                        </Typography>
                        <Typography variant="body2">
                          {data.role.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                </ButtonBase>
              );
            })}
        </Grid>
      {/* </Paper> */}
    </React.Fragment>
  );
}
