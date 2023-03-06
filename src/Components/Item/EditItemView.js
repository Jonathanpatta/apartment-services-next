import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Container, Input, InputAdornment, InputLabel, ListItemButton, TextField, Tooltip } from '@mui/material';
import theme from '@/Theme';
import { useAuth } from '@/Contexts/Auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditItemButton({item,setItem}) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Tooltip title="edit">
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
        </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <EditForm item={item} setItem={setItem} handleClose={handleClose} setOpen={setOpen}/>
        
        
      </Dialog>
    </div>
  );
}

function EditForm({item,setItem,handleClose,setOpen}){
  const [name, setName] = React.useState(item?.name?item.name:"")
  const [description, setDescription] = React.useState(item?.description?item.description:"")
  const [price, setPrice] = React.useState(item?.price?item.price:0)
  const [imageUrls, setImageUrls] = React.useState((item?.image_urls)? item.image_urls:[])
  const [currentUrl, setCurrentUrl] = React.useState("")
  

  var {apiClient} = useAuth()
  var cli = apiClient.Client

  

  function getItem(){

    item.name = name
    item.description = description
    item.price = price
    item.image_urls = imageUrls

    return item
  }

  

  const handleSave = () => {
    var item = getItem()
    if(item && item.pk){
      cli.post("/item/update",item)
      .then(res => {
        setItem(res.data)
        setOpen(false)
      })
      .catch(err => {
        console.log(err);
        setOpen(false)
      })
    }
    else{
      setOpen(false)
    }
  };
  

  function removeImageUrl(url){
    setImageUrls(imageUrls.filter(item => item !== url))
  }
  function addImageUrl(url){
    setImageUrls([url,...imageUrls])
    setCurrentUrl("")
  }

  function saveItem(){
    setItem()
  }

  return (
    <>
      <AppBar sx={{ position: 'relative', bgcolor:theme.palette.primary.main }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Item
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
    <Container maxWidth="md">
          <Box marginTop={2} >
            <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
            <Input 
              sx={{ my: 2 }}  
              fullWidth 
              id="item-name" 
              label="Price" 
              variant="standard" 
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />


            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input 
              sx={{ my: 2 }} 
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              fullWidth 
              id="standard-basic" 
              type='number'
              label="Price" 
              variant="standard" 
              value={price.toString()}
              onChange={(e)=>{setPrice(parseFloat(e.target.value))}}
            />


            <InputLabel htmlFor="standard-adornment-amount">Description</InputLabel>
            <TextField 
              sx={{ my: 2 }}
              fullWidth 
              multiline
              id="standard-basic"
              variant="filled" 
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />

            <List >
              <ListItem sx={{alignItems:"center",justifyContent:"center"}}>
                
                <TextField 
                  sx={{ my: 2 }}  
                  fullWidth 
                  id="item-name" 
                  label="Add Image Url" 
                  variant="standard" 
                  value={currentUrl}
                  onChange={(e)=>{setCurrentUrl(e.target.value)}}
                  onKeyDown={(e)=>{if(e.key=='Enter'){addImageUrl(currentUrl)}}}
                />
                <IconButton aria-label="delete" onClick={()=>{addImageUrl(currentUrl)}}>
                  <AddIcon />
                </IconButton>
              </ListItem>
              {imageUrls.map((url,i) => {
                return (
                  <ListItem
                    key={i} 
                    disablePadding 
                    secondaryAction={
                      <IconButton edge="end" aria-label="remove" onClick={()=>{removeImageUrl(url)}}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={url} />
                  </ListItem>
                )
              })}
              
            </List>
          </Box>
        </Container>
    </>
  )
}