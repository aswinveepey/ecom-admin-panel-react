import React from 'react'
//cookie library import
import Cookies from "js-cookie";
//material ui core import
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
//history hook
// import { useHistory } from "react-router-dom";
//relative imports
import { BASE_URL } from "../../constants";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderBottom: "1px solid black",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm" | "md" | "xs")]: {
      width: "25ch",
      "&:focus": {
        width: "125ch",
      },
    },
  },
}));

export default function AppSearchComp(props) {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const token = Cookies.get("token");
  // const history = useHistory();
  //handle search changes
  function handleSearchChange(event){
    event.preventDefault();
    setSearch(event.target.value);
  }
  //handle input changes
  // function handleInputChange(data) {
  //   // event.preventDefault();
  //   console.log(data);
  //   data && history.push("/user/" + data._id);
  // }

  //useeffect
  React.useEffect(()=>{
    // console.log(search);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ searchString: search }),
    };
    try {
      fetch(
        BASE_URL + "search/user/",
        requestOptions
      ).then(async (data)=>{
        const response = await data.json()
        setOptions(response);
        console.log(response)
      }).catch(err=>console.log(err));
    } catch (error) {
      
    }
  },[search, token])
  //return
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        filterSelectedOptions
        includeInputInList
        autoComplete
        disablePortal
        noOptionsText="No results"
        options={options}
        getOptionLabel={(option) => option.firstname || ""}
        // onInputChange={(event) =>
        //   handleInputChange(options[event.target.value])
        // }
        renderOption={(option) => (
          <React.Fragment>
            <Grid container>
              <Grid item sm={4} lg={4} md={4} xs={4} style={{ padding: "2%" }}>
                <Typography>User</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sm={6} lg={6} md={6} xs={6} style={{ padding: "2%" }}>
                <Link href={"/user/"+option._id}>
                  <Typography>
                    {option.firstname + " " + option.lastname}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Divider flexItem />
          </React.Fragment>
        )}
        renderInput={(params) => {
          const { InputProps, InputLabelProps, ...childParams } = params;
          // console.log(InputProps);
          return (
            <InputBase
              {...childParams}
              type="text"
              ref={InputProps.ref}
              placeholder="Search…"
              value={search}
              onChange={(event) => handleSearchChange(event)}
              label="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          );
        }}
      />
    </div>
  );
}