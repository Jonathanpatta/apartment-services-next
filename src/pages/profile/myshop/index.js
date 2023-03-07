import BreadcrumbLinks from "@/Components/Breadcrumbs";
import ItemView from "@/Components/Item/Item";
import { ItemList } from "@/Components/Item/ItemList";
import { AlertProvider } from "@/Contexts/Alerts";
import { AuthProvider, useAuth } from "@/Contexts/Auth";
import { Box, Container } from "@mui/system";
import axios from "axios";

export default function MyShop(){
    var {isAuthenticated} = useAuth()
    if(!isAuthenticated()){
        window.location.href = "/";
    }
    var breadcrumbLinks = [
        {href:"/",text:"Home"},
        {href:"/profile",text:"Profile"},
        {href:"/profile/myshop",text:"Shop"},
      ]    
      
    return (
                <Container >
                    <Box sx={{ my: 4 }}>
                        <BreadcrumbLinks links={breadcrumbLinks}/>
                    </Box>
                    <ItemList/>
                </Container>
    )
}