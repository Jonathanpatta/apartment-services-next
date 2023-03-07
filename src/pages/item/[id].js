import { ConsumerItemView } from "@/Components/Item/ConsumerItemView";
import { AlertProvider } from "@/Contexts/Alerts";
import { useAuth } from "@/Contexts/Auth";
import { Container,Box } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ItemPageCard({item}){
    if(!item){
        return
    }
    return (
    <Card>
      <CardMedia
        sx={{ height: 400 }}
        image="https://img.freepik.com/free-vector/cute-burger-holding-knife-fork-cartoon-fast-food-icon-concept-isolated-flat-cartoon-style_138676-2204.jpg?w=2000"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.name?item.name:"[NO NAME]"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.description?item.description:"[NO DESCRIPTION]"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    )
}

export default function ItemPage(){
    var router = useRouter()
    var consumerId = decodeURIComponent(router.asPath.split('/')[2])
    console.log(consumerId);
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const {apiClient} = useAuth()
    var cli = apiClient.Client
    
    useEffect(() => {
      var uri = encodeURIComponent(`item/${consumerId}`)
  
      cli.get(uri).then(res => {
        setItem(res.data)
        setLoading(false)
      }).catch(err =>{console.log(err);})
  
    }, [])
    
    return (
        <Container sx={{my:4,alignItems:"center",justifyContent:"center",display:"flex"}} >
            <Box width="60%">
                
                <ConsumerItemView withDescription itemData={item} height={200} loading={loading}/>
            </Box>
        </Container>
    )
}