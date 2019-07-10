import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import "./DetailsPane.css"
import { connect } from 'react-redux'
import {  fetchForks } from '../store/actions'
 import Moment from 'react-moment';
 import Chip from '@material-ui/core/Chip';

const mapStateToProps = (state) => ({
  
  msg : state.settings.msg,
  setForks : state.setForks

})

const styles = {
  root: {
    color: grey[600],
    '&$checked': {
      color: blue[500],
    },
    textAlign: 'left'
  },
    paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: 'white',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',

    padding:  100,
  },
  label: {
    fontSize: 12,
    textAlign: 'left'
  },
   div:{
    marginLeft:10
  },
    button2: {
     backgroundColor: blue[500],
     float: 'right',

  },
     button3: {
      paddingBottom:36,
  },
  cont:{
backgroundColor:'white'
  },
   h3: {
    textAlign: 'left',
    marginLeft:10
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

let tags = [];
class DetailsPane extends React.Component {

sortTags = ( msg ) => {
  tags = []
  for (var file in msg.files) 
  {
          console.log(file)
            if (msg.files.hasOwnProperty(file))
             {
                if (msg.files[file] && msg.files[file].language && typeof msg.files[file].language !== 'undefined')
                 {
                    tags.push(msg.files[file].language);
                }

            }
        }
}
    componentWillReceiveProps(nextProps) {
const {dispatch , msg} = nextProps 
        console.log(tags)
        console.log(msg , nextProps)
        if(nextProps.msg !== this.props.msg){
          this.sortTags(msg)
          dispatch(fetchForks(msg.forks_url))
        }
        
    }

  componentDidMount() {
       
    }

  render() {
  
   
    const { classes  , msg ,setForks} = this.props;
    console.log( this.props)
    let display , init;

    if(setForks.length === 0){

      display = ""

    }
    
    if(!msg.hasOwnProperty("comments"))
    {
      console.log("Details pane Init")
      init = ''
    }
    else {
      init = "Forked Users"
    }

  return (
    <div  >
 <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Gist Details
          </Typography>  
        </Toolbar>
      </AppBar> 
<p>
{tags.map((label, index) => <Chip  color="secondary" key={index} className={classes.chip} label={label}> </Chip>)}
<br></br>
{msg.description}
  <List  component="nav"
    subheader={<ListSubheader component="div">{init}</ListSubheader>}
        className={classes.root} >
  
  <ListSubheader component="div">{display}</ListSubheader>
{setForks.map(value => ( 
      <ListItem>
      <a href={value.url} target="_blank">
        <Avatar src={ value.avatar} > </Avatar>
        </a>
        <ListItemText primary={value.login} secondary={<Moment format="DD-MM-YY, h:mm:ss ">{value.updated_at}</Moment>} />
      </ListItem> 
))}
  </List>
</p>
    </div>
  );
}
}
DetailsPane.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DetailsPane));