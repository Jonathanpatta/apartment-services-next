import BreadcrumbLinks from "@/Components/Breadcrumbs";
import Link from "@/Link";
import  NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ListAltIcon from '@mui/icons-material/ListAltTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShopIcon from '@mui/icons-material/Shop';
import { Box, Breadcrumbs, Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";
import Topbar from "@/Components/Topbar";
import { AuthProvider, useAuth } from "@/Contexts/Auth";
import React from "react";


function CustomListItem({icon,text,link,onclick}){
  if(!link){
    link="#"
  }
  return (
      <ListItem sx={{width:"100%"}} disablePadding>
        <ListItemButton component={Link} noLinkStyle href={link} onClick={onclick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
  );
}

export default function Profile() {

  var {currentUser,isAuthenticated} = useAuth()
  if(!isAuthenticated()){
    window.location.href = "/";
  }
  var breadcrumbLinks = [
    {href:"/",text:"Home"},
    {href:"/profile",text:"Profile"}
  ]
    return (
      <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <BreadcrumbLinks links={breadcrumbLinks}/>
          </Box>
          <Box>
            <nav aria-label="main mailbox folders">
            <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    ACCOUNT
                  </ListSubheader>
                }
              >
                <CustomListItem icon={<ShoppingCartIcon/>} text="Orders" link="/profile/orderHistory"/>
                <CustomListItem icon={<FavoriteIcon/>} text="Favorites" link="/profile/favorites"/>
                <CustomListItem icon={<EventRepeatIcon/>} text="Subscriptions" link="/profile/subscriptions"/>
                <CustomListItem icon={<LogoutIcon/>} text="Logout"/>
              </List>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    SHOP
                  </ListSubheader>
                }
              >
                <CustomListItem icon={<ShopIcon/>} text="My Shop" link="/profile/myshop"/>
                <CustomListItem icon={<ListAltIcon/>} text="Current Orders" link="/profile/currentOrders"/>
                <CustomListItem icon={<FormatListBulletedIcon/>} link="/profile/orderHistory" text="Order History" />
              </List>
            </nav>
          </Box>
      </Container>
    );
  }