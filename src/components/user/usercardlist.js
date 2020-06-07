import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

class UserCardList extends React.Component {
  state = {
    userdata: "",
    fetchstatus: 'loading',
  };
  componentDidMount() {
    this.fetchUserData();
  }
  fetchUserData = async () => {
    let token;
    try {
      token = Cookies.get("token");
    } catch (error) {
      console.log(error);
      return null;
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const fetchResponse = await fetch(BASE_URL + "user/", requestOptions);
    const { status } = fetchResponse;
    const jsonResponse = await fetchResponse.json();
    if (status === 200) {
      // console.log(jsonResponse.data);
      this.setState({ fetchstatus: "fetched", userdata: jsonResponse.data });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
  };
  async handleCardClick(e, userId){
    e.preventDefault();
    await this.props.onSelect(userId);
  }
  render() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="flex-start">
          {this.state.fetchstatus === "fetched" &&
            this.state.userdata.map((data) => {
              return (
                <div onClick={(e)=>{this.handleCardClick(e, data._id);}} key={data._id}>
                  <Grid item>
                    <Card elevation={0}>
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
                  </Grid>
                  <Divider />
                </div>
              );
            })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default UserCardList;