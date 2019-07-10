import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListPane from "./pages/ListPane";
import Grid from "@material-ui/core/Grid";
import DetailsPane from "./pages/DetailsPane";
const styles = {
  root: {
    textAlign: "left"
  },

  div: {
    display: "flex",
    flexDirection: "row wrap",
    padding: 20,
    width: "95%",
    background: "white"
  },
  paperLeft: {
    height : "93vh",
    overflowY: "scroll",
    flexGrow: 0, flexShrink: 1, flexBasis: 'auto',
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    padding: 10,
    background: "white"
  },

  paperRightTop: {
height : "93vh",
overflowY: "scroll",
    flex: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    // marginBottom: 25,
    textAlign: "center"
  },
  paperRight: {
    flex: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    textAlign: "center"
  },

  rightGrid: {
    padding: 0,

  }
};

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div style={styles.div}>
          <Grid container wrap="nowrap" spacing={24}>
            <Grid style={styles.paperLeft} item xs={12}>
              <ListPane
                className={classes.paper}
              />
            </Grid>
            <Grid style={styles.rightGrid} item xs={12} lg={9}>
              <Grid style={styles.paperRightTop} item  item xs={12}>
                <DetailsPane
                  className={classes.paper}
                />
              </Grid>

            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
