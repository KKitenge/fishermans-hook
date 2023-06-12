import React, { useContext, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    createTheme,
    ListItemButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';
import { AppStateContext } from '../../app-state';
import GroupIcon from '@mui/icons-material/Group';

const HamburgerMenu = () => {
    const { appState: { user } } = useContext(AppStateContext);
    const history = useNavigate();
    const location = useLocation();
    const classes = createTheme((theme) => ({
        menuButton: {
            marginRight: theme.spacing(2),
        },

        list: {
            width: 300,
        },
    }));;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    const menuItems = user ? [
        { text: 'Posts', icon: <HomeIcon />, onClick: () => history("/"), path: "/" },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => history("/profile"), path: "/profile" },
        { text: 'Messages', icon: <EmailIcon />, onClick: () => history("/messages"), path: "/messages" },
        { text: 'Friend', icon: <GroupIcon />, onClick: () => history("/friends"), path: "/friends" },
        {
            text: 'Logout', icon: <ExitToAppIcon />, onClick: () => {
                AuthService.logout()
            }
        },
    ]
        : [
            { text: 'Login', icon: <AccountCircleIcon />, onClick: () => history("/login"), path: "/login" },
            { text: 'Register', icon: <AccountCircleIcon />, onClick: () => history("/signup"), path: "/signup" },
        ];


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)} >
                <div className={classes.list} role="presentation" style={{ marginTop: "2rem" }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItemButton key={item.text} onClick={() => {
                                setIsOpen(false)
                                item.onClick();
                            }}
                                selected={location.pathname === item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default HamburgerMenu;

