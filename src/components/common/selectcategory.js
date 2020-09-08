import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CategoryService from "../../services/category";

const useStyles = makeStyles((theme) => ({
  selectButton: {
    textTransform: "none",
    width: "100%",
  },
  searchinput: {
    width: "100%",
  },
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // marginLeft:'1%',
    marginBottom: "1%",
  },
}));
const categoryService = new CategoryService();

export default function SelectCategory(props) {
  const classes = useStyles();
  const [categorySearch, setCategorySearch] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  //handle close propogation
  const handleClose = () => {
    props.handleClose();
  };
  //on select category pass data back to parent
  const selectCategory = (category) => {
    props.selectCategory(category);
    props.handleClose();
  };
  const onCategorySearch = (event) => {
    event.persist();
    setCategorySearch(event.target.value);
  };
  //search hook
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    categoryService
      .searchCategories(signal, categorySearch)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [categorySearch]);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="category-select-dialog"
      >
        <DialogContent>
          <Paper component="form" className={classes.searchbar}>
            <InputBase
              placeholder={"Search Categories"}
              className={classes.searchinput}
              onChange={onCategorySearch}
            />
          </Paper>
          {categories.map((category) => (
            <Card variant="outlined" key={category._id}>
              <Button
                onClick={selectCategory.bind(this, category)}
                className={classes.selectButton}
              >
                <CardContent>
                  <Typography variant="body2">
                    {category?.name}
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
