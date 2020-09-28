//// LAYOUT PAGE
// MATERIAL component is the place to call all the paths as hold NAVBAR
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from '@material-ui/icons/List';
import SearchIcon from "@material-ui/icons/Search"
//import EditIcon from "@material-ui/icons/Edit";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// TO LINK ALL PATH
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MaterialLayout() {
  const classes = useStyles();



  return (
    <div className={classes.root} >

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List >
            {/* ///////////////////// */}
            {/* "/home" is path name and use 'link'  to connect the component of its path*/}
            <ListItem button component={Link} to="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />

            </ListItem>
            {/* ///////////////////// */}

            <ListItem button component={Link} to="/listuser">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="ListUser" />
            </ListItem>

            {/* ///////////////////// */}

            <ListItem button component={Link} to="/search">
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>

            {/* ///////////////////// */}
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>

            {/* ///////////////////// */}
            <ListItem button component={Link} to="/register">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
            {/* ///////////////////// */}
            <ListItem button component={Link} to="/about">
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            {/* ///////////////////// */}
            <ListItem button component={Link} to="/mcard">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Mat Card" />
            </ListItem>

            {/* ///////////////////// */}
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
}
