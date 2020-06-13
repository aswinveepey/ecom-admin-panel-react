import React from 'react'
//cookie library import
import Cookies from "js-cookie";
//material ui core import
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
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

export default function AppSearchComp() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const token = Cookies.get("token");

  function handleSearchChange(event){
    event.preventDefault();
    setSearch(event.target.value);
  }

  React.useEffect(()=>{
    console.log(search);
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
        console.log(response)
        setOptions(response)
      }).catch(err=>console.log(err));
    } catch (error) {
      
    }
  },[search])
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        filterSelectedOptions
        includeInputInList
        autoComplete
        options={options}
        getOptionLabel={(option) => option.firstname || ""}
        renderInput={(params) => {
          const { InputProps, InputLabelProps, ...childParams } = params;
          console.log(InputProps);
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