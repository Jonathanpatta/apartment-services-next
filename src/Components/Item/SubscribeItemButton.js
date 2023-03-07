import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Input, Select,MenuItem, InputLabel, Tooltip } from '@mui/material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { useAuth } from '@/Contexts/Auth';
import { useAlerts } from '@/Contexts/Alerts';

export default function SubscribeItemButton({item}) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("")
  const [writeNote, setWriteNote] = React.useState(false)
  const [type, setType] = React.useState('')

  function HandleTypeChange(e){
    setType(e.target.value)
  }

  var {apiClient,isAuthenticated} = useAuth()
  var cli = apiClient.Client

  var {CreateAlert} = useAlerts()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if(!isAuthenticated()){
      CreateAlert({type:"error",text:"Unauthenticated"})
      return
    }
    var uri = `subscription/create/${encodeURIComponent(apiClient.consumer.sk)}`
    var data = {
        item_id:item.sk,
        item_name:item.name,
        type:type,
        note: note,
    }
    cli.post(uri,data=data).then(res => {
      console.log(res.data);
      CreateAlert({type:"success",text:"successfully placed order!"})
    }).catch(err => {
      CreateAlert({type:"error",text:"Couldn't subscribe:"+err})
    })
    handleClose()
  }

  var title = "Place Order"
  if(item && item.name){
    title = <div>Place Order for <b><i>{item.name}</i></b></div>
  }

  return (
    <div>
      <Tooltip title="Subscribe">
            <IconButton onClick={handleClickOpen}>
                <EventRepeatIcon />
            </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{minWidth:600}}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item?.description}
          </DialogContentText>
          <DialogContentText>
            Total Price: <b>₹ {item?.price}/Month</b>
          </DialogContentText>
          <Divider/>
          <FormGroup>
            <InputLabel id="subscription-type-label">Type</InputLabel>
            <Select
                labelId='subscription-type-label'
                value={type}
                label="Type"
                onChange={HandleTypeChange}
                >
                <MenuItem value={10}>Daily</MenuItem>
                <MenuItem value={20}>Weekly</MenuItem>
                <MenuItem value={30}>Monthly</MenuItem>
            </Select>
            <FormControlLabel control={
                <Checkbox
                    checked={writeNote}
                    onChange={()=>{setWriteNote(val=>!val)}}
                />
            } label="Write a note with your order" />
            {writeNote && <>
                <InputLabel htmlFor="standard-adornment-amount">Note</InputLabel>
                <Input 
                    sx={{ my: 2 }} 
                    fullWidth 
                    id="standard-basic" 
                    type='number'
                    label="note" 
                    variant="standard" 
                    value={note}
                    onChange={(e)=>{setNote(e.target.value)}}
                    multiline
                />
            </>}
          </FormGroup>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
