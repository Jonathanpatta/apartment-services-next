import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '@/Contexts/Auth';
import { useAlerts } from '@/Contexts/Alerts';

export default function OrderItemButton({item}) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("")
  const [writeNote, setWriteNote] = React.useState(false)

  var {apiClient} = useAuth()
  var cli = apiClient.Client

  var {CreateAlert} = useAlerts()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    var uri = `order/create/${encodeURIComponent(apiClient.consumer.sk)}`
    var data = {
        item_id:item.sk,
        item_name:item.name,
        note: note,
    }
    cli.post(uri,data=data).then(res => {
      console.log(res.data);
      CreateAlert({type:"success",text:"successfully placed order!"})
    }).catch(err => console.log(err))
    handleClose()
  }

  return (
    <div>
      <Tooltip title="Order">
            <IconButton onClick={handleClickOpen}>
                <ShoppingCartIcon />
            </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Place Order for <b><i>{item.name}</i></b></DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item.description}
          </DialogContentText>
          <DialogContentText>
            Total Price: <b>₹ {item.price}</b>
          </DialogContentText>
          <Divider/>
          <FormGroup>
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
