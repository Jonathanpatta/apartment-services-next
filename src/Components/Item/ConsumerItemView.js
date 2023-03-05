import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import EditItemButton from './EditItemView';
import { useAuth } from '@/Contexts/Auth';
import { resolve } from 'styled-jsx/css';
import { async } from '@firebase/util';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export function ConsumerItemView({itemData}) {
  var item = itemData
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Food Image"
        height="200"
        image="https://img.freepik.com/free-vector/cute-burger-holding-knife-fork-cartoon-fast-food-icon-concept-isolated-flat-cartoon-style_138676-2204.jpg?w=2000"
      />
      <CardContent>
        <Stack sx={{ display: 'flex', alignItems: 'center',justifyContent:"center"}}>
            <Typography gutterBottom variant="h5" component="div" sx={{display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
            {item?.name?item.name:"[NO NAME]"}
            </Typography>
            <Typography variant='subtitle1'><b>₹ {item?.price?item.price:"[PRICE NOT SET]"}</b></Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-evenly",width:"100%"}}>
            <Tooltip title="Like">
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="Order">
                <IconButton>
                    <ShoppingCartIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Subscribe">
                <IconButton>
                    <EventRepeatIcon />
                </IconButton>
            </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}

export function ConsumerItemListView(){
    const {apiClient} = useAuth()
    var cli = apiClient.Client
  
    const [items, setItems] = React.useState([])
    
    React.useEffect(() => {
      var uri = encodeURIComponent(`item/list`)
  
      cli.get(uri).then(res => {
        setItems(res.data)
      })
  
    }, [])

    return(
        <Box>
          <Grid container rowSpacing={4} columnSpacing={4}>
              {items.map((item,i) => {
              return <GridItem key={i} item={item} />
              
              })}
          </Grid>
        </Box>
      )
}

function GridItem({item,editItem}){
    return (
        <Grid item xs={3}>
            <ConsumerItemView itemData={item} />
        </Grid>
    )
}