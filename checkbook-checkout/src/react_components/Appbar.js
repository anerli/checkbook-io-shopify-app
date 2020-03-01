import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SVG from 'react-inlinesvg';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    backgroundColor: 'blue',
    color: 'blue',
  },
  

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <img src="https://checkbook.io/static/media/white_logo.c6735bbc.svg"/>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button href='https://checkbook.io/' color="inherit">Full Website </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}