import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">{children}</Alert>
        </div>
    );
}
