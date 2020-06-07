import React from 'react'
import { Paper, Grid, Typography, Container } from "@material-ui/core";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

class UserDetailComp extends React.Component {
  state = {
    userdata: "",
    fetchstatus: "init",
  };
  componentDidUpdate(prevProps) {
    if (!(this.props.userId === prevProps.userId)) {
      this.fetchUserData(this.props.userId);
    }
  };
  fetchUserData = async (userId) => {
    this.setState({fetchstatus: 'loading'})
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
    const fetchResponse = await fetch(
      BASE_URL + "user/" + userId,
      requestOptions
    );
    const { status } = fetchResponse;
    const jsonResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({ fetchstatus: "fetched", userdata: jsonResponse.data });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
  };
  render() {
    if (this.state.fetchstatus === "init") {
      return (
        <Container>
          <Typography>Select a User From the List</Typography>
        </Container>
      );
    } else if(this.state.fetchstatus==='loading'){
      return (
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      );
    }
    return (
      <React.Fragment>
        <Paper className="paper-container" elevation={0}>
          <Grid container direction="column" justify="center" spacing={1}>
            {/* populate form data */}
            <form>
              <Grid item>
                <Typography variant="h4">
                  {this.state.userdata.firstname}&nbsp;
                  {this.state.userdata.lastname}
                </Typography>
                <Typography variant="h6">User Details</Typography>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

export default UserDetailComp;