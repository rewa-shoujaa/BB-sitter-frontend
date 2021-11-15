import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import useStyles from './styles.js';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory } from 'react-router-dom';


const Header = ({ onPlaceChanged, onLoad, showAppointment, setopenProfile, setopenAppointmentsList, getAppointments, notificationList, NotificationRead, notificationCount, loadNotifcations, getNotification }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    let history = useHistory();

    const handleMenu = (event) => {
        getNotification();
        setAnchorEl(event.currentTarget);
    };
    const handleNotiMenu = (event) => {
        getNotification();
        setAnchorE2(event.currentTarget);
    };

    const handleCloseNotiMenu = (event) => {
        NotificationRead();
        setAnchorE2(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar className={classes.toolbar}>
                <img src="../../logo.png" alt="logo" className={classes.logo} />

                <Typography variant="h6" className={classes.title}>
                    your kids are in safe hands...
                </Typography>


                <Box sx={{ display: { xs: 'flex' } }}>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleNotiMenu}>
                        <Badge badgeContent={notificationCount > 0 ? notificationCount : null} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu

                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorE2}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorE2)}
                        onClose={handleCloseNotiMenu}
                        PaperProps={{
                            style: {
                                maxHeight: '50%',
                                maxwidth: '50%',
                                overflow: 'auto',
                            },
                        }}
                    >
                        {loadNotifcations ?
                            notificationCount > 0 ?
                                notificationList.map((notification, i) => {
                                    console.log(notification);
                                    return (
                                        <MenuItem key={i} style={{ width: '100%', overflow: 'auto' }}>
                                            <div> {notification.notification}</div>
                                        </MenuItem>

                                    );
                                }) : <div>no notifications</div>
                            : <div>loading...</div>
                        }

                    </Menu>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { setopenProfile(true); handleClose() }}>Profile</MenuItem>
                        <MenuItem onClick={() => { getAppointments(); setopenAppointmentsList(true); handleClose() }}>Appointments</MenuItem>
                        <MenuItem onClick={() => { history.push("/") }}>Logout</MenuItem>
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;