import * as React from 'react';
import { useEffect,useState } from 'react'
import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Icon, SvgIcon } from '@mui/material';
import logo from "./l&Tsmw.png"
import logo2 from "./l-and-t-smart-world (1).png"
import {Tab, Tabs} from '@mui/material';
import NetDropdown from './netdropdown';
import DropdownOptions from './dropdown';
import {createTheme} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import fusiondark from "./FUSION SafeOS.png"
import fusionlight from "./FUSION safeOS - Dark_new.jpg"





const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   position: 'fixed', // Add fixed position
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Layout = ({handleThemeChange, theme}) => {
  console.log(theme)
  // const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 0 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 0 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  

  const handleDrawerClose = () => {
    // setIsDrawerOpen(false);
    setOpen(false);
  };

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

//   const handleDrawerToggle = () => {

//      setIsDrawerOpen(!isDrawerOpen);
    
//  };
 

 const handleClose=()=>{
  setSelectedItem(!selectedItem);
 }


const [activeButton, setActiveButton] = useState(null);

const handleButtonHover = (button) => {
  setActiveButton(button);
};

const handleNavbarMouseLeave = () => {
  setActiveButton(null);
};



    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>

            {open ? <IconButton
              color="inherit"
              aria-label="open drawer"
              onMouseOver={handleDrawerClose}
              // onClose={handleDrawerClose}
              edge="start"
              sx={{
                marginRight: 5,
                // ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>  
            :
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onMouseOver={handleDrawerOpen}
              // onClose={handleDrawerClose}
              edge="start"
              sx={{
                marginRight: 5,
                // ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> }
           

            <Box sx={{ width:'260px', height:'65px', ml:'-50px'}} >
            <Icon
            size="large"
            color="inherit"
            aria-label="menu"
            noWrap component="div"
            sx={{ mb:2,  padding:2, flexGrow: 2 ,width:'250px',height:'60px' }}
          > {theme.palette.mode === "dark" ? 
        <img
          src={fusionlight}
          alt=""
          height="40px"
          width='200px'/> :

          <img
          src={fusionlight}
          alt=""
          height="40px"
          width='200px'

        />}
          </Icon>
          </Box>


            <Box sx={{m:'0 700px 0 0', width:'260px', height:'65px', ml:'-50px'}} >
            <Icon
            size="large"
            color="inherit"
            aria-label="menu"
            noWrap component="div"
            sx={{ mb:2,  padding:2, flexGrow: 2 ,width:'250px',height:'60px' }}
          > {theme.palette.mode === "dark" ? 
        <img
          src={logo}
          alt=""
          height="40px"
          width='200px'/> :

          <img
          src={logo2}
          alt=""
          height="40px"
          width='200px'

        />}
          </Icon>
          </Box>

          <Box sx={{m:'0 0 0 -700px'}}>


{selectedItem === 'SLA Dashboard' &&
  <nav onMouseLeave={handleNavbarMouseLeave}>
<button className='topbar-button' onMouseEnter={() => handleButtonHover('button1')}>Button 1</button>
{activeButton === 'button1' && (
<div className="dropdown-menu">
<button>Option 4</button>
<button>Option 5</button>
<button>Option 6</button>
<button>Option 6</button>
<button>Option 6</button>
</div>

)}

<button className='topbar-button' onMouseEnter={() => handleButtonHover('button2')}>Button 2</button>
{activeButton === 'button2' && (
<div className="dropdown-menu">
<button>Option 1</button>
<button>Option 2</button>
<button>Option 3</button>
</div>
)}
</nav>}
</Box>



          <Box sx={{ position : 'fixed', right:-1}}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
         
         <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 0}}
           onClick={handleThemeChange}
         >
           <LightModeIcon />
         </IconButton>

           <IconButton size="large" aria-label="show 4 new mails" color="inherit">
             <Badge badgeContent={0} color="error">
               <MailIcon />
             </Badge>
           </IconButton>

           <IconButton
             size="large"
             aria-label="show 17 new notifications"
             color="inherit"
           >
             <Badge badgeContent={0} color="error">
               <NotificationsIcon />
             </Badge>
           </IconButton>

           <IconButton
             size="large"
             edge="end"
             aria-label="account of current user"
             aria-controls={menuId}
             aria-haspopup="true"
             onClick={handleProfileMenuOpen}
             color="inherit"
             sx={{mr:1}}
           >
             <AccountCircle />
           </IconButton>
          
         </Box>

       
         <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
           <IconButton
             size="large"
             aria-label="show more"
             aria-controls={mobileMenuId}
             aria-haspopup="true"
             onClick={handleMobileMenuOpen}
             color="inherit"
           >
             <MoreIcon />
           </IconButton>
         </Box>
         
         </Box>
       </Toolbar>
     </AppBar>
     {renderMobileMenu}
     {renderMenu}
     

    

        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
              {/* <MenuIcon /> */}
            </IconButton>
          </DrawerHeader>
          {/* <Divider /> */}
          <List>
            {['SLA Dashboard', 'Meter install', 'AIMS', 'User Authorisation', 'O&M','CONFIG'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={()=>{setSelectedItem(text)}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit'
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    {/* {index ===0 ? <InboxIcon/>:null}
                    {index ===1 ? <MailIcon/>:null} */}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3}} >
          <DrawerHeader />
         
          <Tabs 
        value={value}
        onChange={handleChange}
        aria-label="hierarchy tabs"
        indicatorColor='secondary'
      >
        <Tab label="Org Hierarchy" />
        <Tab label="Net Hierarchy" />
      </Tabs>
      {value === 0 && <DropdownOptions theme={theme} />}
      {value === 1 && <NetDropdown theme={theme} />}
        
    
        </Box>
      // </Box>

  );
}

export default Layout;


