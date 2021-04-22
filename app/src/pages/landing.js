import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import titleScreen from '../util/title.png'; // with import


const drawerWidth = 240;

const styles = (theme) => ({
	root: {
        flexGrow: 1,
      },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '45%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

class landing extends Component {
	state = {
		render: false
	};


	render() {
		const { classes } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar}>
                        
						<Toolbar>
                            <Grid
                                justify="space-between" // Add it here :)
                                container 
                                spacing={24}
                            >
                                <Grid item>
                                    <Typography type="title" variant="h6" noWrap>
								        ValueApp
							        </Typography>
                                </Grid>
                                <Grid item>
                                    <div>
                                        <Button color="inherit" href="signup" variant="h6">
								            {"Sign Up"}
							            </Button>
                                        <Button color="inherit" href="login" variant="h6">
								            {"Login"}
							            </Button>
                                    </div>
                                </Grid>
                            </Grid>
						</Toolbar>
					</AppBar>
                    <img width="80%" height="auto" style={{ paddingTop:90, display:'block', textAlign:'center', marginLeft:'auto', marginRight:'auto'}} src={titleScreen} />
				</div>
			);
		}
	}
}

export default withStyles(styles)(landing);