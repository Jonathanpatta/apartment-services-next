import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import EditItemButton from './EditItemView';
import { useAuth } from '@/Contexts/Auth';
import { resolve } from 'styled-jsx/css';
import { async } from '@firebase/util';

export default function ItemView({itemData,editItem}) {
  var item = itemData
  var setItem = (item) => {
    editItem(item)
  }
  // const [item, setItem] = React.useState(itemData)

  var thumbnailUrl = "https://img.freepik.com/free-vector/cute-burger-holding-knife-fork-cartoon-fast-food-icon-concept-isolated-flat-cartoon-style_138676-2204.jpg?w=2000"
  if(item && item.image_urls && item.image_urls.length>0){
    thumbnailUrl = item.image_urls[0]
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Food Image"
        height="200"
        image={thumbnailUrl}
      />
      <CardContent>
        <Stack sx={{ display: 'flex', alignItems: 'center',justifyContent:"center"}}>
            <Typography gutterBottom variant="h5" component="div">
            {item?.name?item.name:"[NO NAME]"}
            </Typography>
            <Typography variant='subtitle1'><b>₹ {item?.price?item.price:"[PRICE NOT SET]"}</b></Typography>
            <Divider/>
            <Typography variant="body2" color="text.secondary">
              {item?.description?item.description:"[NO DESCRPIPTION]"}
            </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-evenly",width:"100%"}}>
            <EditItemButton item={itemData} setItem={setItem}/>
            
            <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}