import { Avatar, Box, Grid, IconButton, InputAdornment, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import theme from "@/Theme";
// import { auth, getCurrentUser, signInWithGoogle } from "@/firebase";
import { useAuth } from "@/Contexts/Auth";
import FreeSoloCreateOption from "./Search";
import Link from "@/Link";

const Profile = ({user, signInCallback, logoutCallback}) => {
    var profileComponent = 
    <IconButton  onClick={signInCallback}>
        <PersonOutlinedIcon />
    </IconButton>
    if(user){
        profileComponent = 
        <IconButton LinkComponent={Link} noLinkStyle href="/profile">
            <Avatar  src={user.photoURL}  />
        </IconButton>
    }

    return profileComponent
}

const Topbar = () => {

  const { currentUser, logout,signInWithGoogle } = useAuth()

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        color={theme.palette.primary}
        borderRadius="3px"
      >
        
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" endAdornment={<InputAdornment><SearchIcon/></InputAdornment>} />
        {/* <FreeSoloCreateOption sx={{ ml: 2, flex: 1 }} color="secondary"/> */}
      </Box>

      <Box display="flex" justifyContent="space-between">

      <Grid container alignItems="stretch">
        <Grid item style={{display: 'flex'}}>
          <IconButton >
            <SettingsOutlinedIcon />
          </IconButton>
        </Grid>

        <Grid item style={{display: 'flex'}}>
          <Profile  user={currentUser} signInCallback={signInWithGoogle} logoutCallback={logout}/>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default Topbar;