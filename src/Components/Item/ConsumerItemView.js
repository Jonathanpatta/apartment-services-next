import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import EditItemButton from './EditItemView';
import { useAuth } from '@/Contexts/Auth';
import { resolve } from 'styled-jsx/css';
import { async } from '@firebase/util';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import OrderItemButton from './OrderItemButton';
import SubscribeItemButton from './SubscribeItemButton';

export function ConsumerItemView({itemData,loading,height,withDescription}) {
  if(!height){
    height = 200
  }


  var item = itemData
  const [liked, setLiked] = React.useState(false)
  if(loading){
    return (
      <Stack sx={{maxWidth:345}} >
        <Skeleton variant="rectangular"  height={200} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
      </Stack>
    )
  }
  return (
    <Card >
      <CardMedia
        component="img"
        alt="Food Image"
        height={height}
        image="https://img.freepik.com/free-vector/cute-burger-holding-knife-fork-cartoon-fast-food-icon-concept-isolated-flat-cartoon-style_138676-2204.jpg?w=2000"
      />
      <CardContent>
        <Stack sx={{ display: 'flex', alignItems: 'center',justifyContent:"center"}}>
            <Typography gutterBottom variant="h5" component="div" sx={{display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
            {item?.name?item.name:"[NO NAME]"}
            </Typography>
            {withDescription && <Typography variant='subtitle1'>{item?.description?item.description:"[DESCRIPTION NOT SET]"}</Typography>}
            <Typography variant='subtitle1'><b>₹ {item?.price?item.price:"[PRICE NOT SET]"}</b></Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-evenly",width:"100%"}}>
            <Tooltip title="Like">
                <IconButton onClick={()=>{setLiked(like=>!like)}}>
                  {liked?<FavoriteIcon />:<FavoriteBorderIcon/>}
                </IconButton>
            </Tooltip>
            
            {/* <div>
              <Tooltip title="Order">
                  <IconButton>
                      <ShoppingCartIcon />
                  </IconButton>
              </Tooltip>
            </div> */}

            <OrderItemButton item={item}/>

            <SubscribeItemButton item={item}/>
        </Box>
      </CardActions>
    </Card>
  );
}

export function ConsumerItemListView(){
    const {apiClient} = useAuth()
    var cli = apiClient.Client

    const [loading, setLoading] = React.useState(true)

    var loadingItems = ["","","","","","","",""]
  
    const [items, setItems] = React.useState(loadingItems)
    
    React.useEffect(() => {
      var uri = encodeURIComponent(`item/list`)
  
      cli.get(uri).then(res => {
        setItems(res.data)
        setLoading(false)
      }).catch(err=>setLoading(false))
  
    }, [])

    return(
        <Box>
          <Grid container rowSpacing={4} columnSpacing={4}>
              {items.map((item,i) => {
              return <GridItem key={i} item={item} loading={loading} />
              
              })}
          </Grid>
        </Box>
      )
}

function GridItem({item,loading}){
    return (
        <Grid item xs={3}>
            <ConsumerItemView itemData={item} loading={loading} />
        </Grid>
    )
}