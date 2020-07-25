import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import UserApi from "../../api/user";

const cardElevation = 0
const userApi = new UserApi();

export default function UserCardList(props) {
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
      <Paper className="paper-box" variant="elevation" elvation={1}>
        <Grid container direction="column" wrap="nowrap">
          {fetchStatus === "fetched" &&
            userData?.map((data) => {
              return (
                <Grid item key={data._id}>
                  <Card
                    elevation={
                      selectedId === data._id
                        ? 2
                        : cardElevation
                    }
                    className="list-card-item"
                    onClick={handleCardClick.bind(this, data._id)}
                  >
                    <CardContent>
                      <Grid container spacing={1} justify="flex-start">
                        <Grid item>
                          <Avatar>
                            {data.firstname[0] + data.lastname[0]}
                          </Avatar>
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
                    </CardContent>
                  </Card>
                  <Divider />
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
