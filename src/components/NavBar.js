import React from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        margin: "auto",
        width: '100%'
    },
    grid: {
        textAlign: 'center'
    }
})

const styles = {
    border: '1px solid black',
    backgroundColor: '#222831'
}

const link = {
    textDecoration: 'none',
    width: '100%',
    color: '#ececec'
}

const NavBar = () => {

    const classes = useStyles();

    return (
        <div style={styles}>
            <Grid container>
                <Grid item xs={6} className={classes.grid}>
                    <Button className={classes.root}>
                        <NavLink style={link} to='/users'>Users</NavLink>
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.grid}>
                    <Button className={classes.root}>
                        <NavLink style={link} to='/projects'>Projects</NavLink>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

}

export default NavBar;