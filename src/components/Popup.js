import React from 'react';
import {Dialog, DialogTitle, DialogContent, makeStyles, Typography} from '@material-ui/core';
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles =makeStyles(theme=>({
    dialogWrapper :{
        padding: theme.spacing(2),
        position:'absolute',
        top: theme.spacing(5),
        minWidth: '70vw',
        minHeight: '70vh',
        maxWidth: "md"

    },
    dialogTitle:{
        paddingRight:'0px'
    }
}))

export default function Popup(props) {
    const{title, children, openPopup, setOpenPopup}=props;
    const classes = useStyles();


    return (
        <Dialog open={openPopup} classes={{paper: classes.dialogWrapper}} disableEnforceFocus>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1, color:'#2E3B55'}}>
                        {title}
                    </Typography>
                    <Button onClick={()=>{setOpenPopup(false)}} style={{color: 'black', border:'none'}}
                variant="outlined" >
                    <CloseIcon />
                </Button>
                </div>
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
