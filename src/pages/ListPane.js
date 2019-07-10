import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { actions , fetchPostsIfNeeded } from '../store/actions'
 import { connect } from 'react-redux'
 import * as constants from '../Constants/constants';
 import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  flex: {
    flex: 1
  },

  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  listItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary": {
        color: theme.palette.common.white
      }
    },

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& $primary": {
        color: theme.palette.common.white
      }
    }
  },

  primary: {},
  icon: {},

  toolbar: {
    minHeight: "20px "
  }
});

class ListPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      searchedItems: [],
      selected: null,
      anchorEl: null,
      checked: false
    };
  }
  componentDidMount() {
  
          this.setState({
            isLoaded: true,
            items: this.props.posts || [{}] ,
            searchedItems: this.props.posts || [{}]
          });

  }

  componentWillMount() {
    console.log(this.state.searchedItems);
  }

  doSomethingWith = arg1 => {
    console.log(arg1, this.state.items);
    const {dispatch} = this.props
        dispatch(actions.setHAMZACHAT(arg1))
        console.log(arg1)
          dispatch(fetchPostsIfNeeded(arg1))


  };

  onItemClickHandler = (arg1, e) => {
    const {dispatch} = this.props
    console.log(arg1 , e);
    dispatch(actions.setSelected(arg1))
  };
  state = {
    checked: [1]
  };

  

  handleChange = () => {
    console.log("Hamza");
    this.setState({ checked: !this.state.checked });
  };

  render() {
     const { selectedgists, posts, isFetching, lastUpdated } = this.props
    const { classes } = this.props;
    const {
      isLoaded,
      selected
    } = this.state;
console.log( this.props);
    let toolbar , Error1;
    let Progress;

    const { error } = this.props
    console.log( error,
        selectedgists,
        posts,
        isFetching,
        lastUpdated)

console.debug(posts)
    
      toolbar = 
        
          <SearchBar
            placeholder="Gists Search"
            value={this.state.value}
            onRequestSearch={newValue => this.doSomethingWith(newValue)}
          />
        
    if (error) {
      Error1 = <div>Error: {error.status} {error.statusText } </div>;
    } 
      else if(!isLoaded){
Progress = <LinearProgress color="primary" />;

      }
    else if (isLoaded) {
        Progress = '';
    } 
      return (
        <div className={classes.root}>

         

          {toolbar}

        

<div>{Progress}</div>



          <List>
  
            {posts.map(value => (
              <div
                key={value.id}
                onClick={this.onItemClickHandler.bind(this, value)}
                selected={selected === 2}
              >
                <ListItem dense button className={classes.listItem}>
                  <Avatar src={value.owner && value.owner.avatar_url} > </Avatar>
                  {/*   <ListItemText primary={value.name} secondary={value.username} />
         */}
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    primary={value.owner && value.owner.login }
                   
                    secondary={
                      <Typography
                        type="body1"
                        style={{
                          fontSize: "small",
                         /* lineHeight: 1,*/
                          color: "rgba(0, 0, 0, 0.54)"
                        }}
                      > 
                        {value.files[Object.keys(value.files)[0]].filename} <br /> 
                        <span> <Moment format="YYYY/MM/DD">{value.created_at}</Moment> </span>
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider  component="li" />
              </div>
            ))}
          </List>
      
        </div>
      );
    
  }
}

ListPane.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
     const { selectedgists, postsByGists , errorgists } = state
     console.log(state)
    const {

        isFetching,
        lastUpdated,
        items: posts
    } = postsByGists["posts"] || {
        isFetching: true,
        items: []
        
    }

    const error = errorgists

    return {
      error,
      postsByGists,
        selectedgists,
        posts,
        isFetching,
        lastUpdated
    }
    
}

export default connect(mapStateToProps)(withStyles(styles)(ListPane));
