import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Box,
  Container,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  ListItemButton,
  TextField,
  Tooltip,
  Checkbox
} from "@mui/material";
import theme from "@/Theme";
import { useAuth } from "@/Contexts/Auth";
import { useAlerts } from "@/Contexts/Alerts";
import ImageManager from "src/Components/Image/ImageManager";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemButton({ item, addNewItem }) {
  const [open, setOpen] = React.useState(false);
  
  var {isAuthenticated} = useAuth()
  var {CreateAlert} = useAlerts()

  const handleClickOpen = () => {
    if(!isAuthenticated()){
      CreateAlert({type:"error",text:"Unauthenticated"})
      return
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="edit">
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          {" "}
          add item
        </Button>
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <EditForm
          item={item}
          addNewItem={addNewItem}
          handleClose={handleClose}
          setOpen={setOpen}
        />
      </Dialog>
    </div>
  );
}

function EditForm({ item, addNewItem, handleClose, setOpen }) {
  const [name, setName] = React.useState(item?.name ? item.name : "");
  const [description, setDescription] = React.useState(
    item?.description ? item.description : ""
  );
  const [price, setPrice] = React.useState(item?.price ? item.price : 0);

  const [allowSubscriptions, setAllowSubscriptions] = React.useState(item?.allow_subscriptions ? item.allow_subscriptions : false);
  const handleAllowSubscriptionsChange = (event) => {
    setAllowSubscriptions(event.target.checked);
  };

  console.log(allowSubscriptions);

  const [imageUrls, setImageUrls] = React.useState(
    item?.image_urls ? item.image_urls : []
  );

  

  var { apiClient } = useAuth();
  var cli = apiClient.Client;

  var { CreateAlert } = useAlerts();

  function getItem() {
    if (!item) {
      item = {};
    }
    item.name = name;
    item.description = description;
    item.price = price;
    item.image_urls = imageUrls;
    item.allow_subscriptions = allowSubscriptions

    return item;
  }

  const handleSave = () => {
    var item = getItem();
    if (item) {
      var uri = `/producer/${encodeURIComponent(
        apiClient.producer.sk
      )}/createItem`;
      cli
        .post(uri, item)
        .then((res) => {
          addNewItem(res.data);
          setOpen(false);
          CreateAlert({ text: "Item Added Succesfully!", type: "success" });
        })
        .catch((err) => {
          setOpen(false);
          CreateAlert({ type: "error", text: err });
        });
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <AppBar
        sx={{ position: "relative", bgcolor: theme.palette.primary.main }}
      >
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
            Add Item
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box marginTop={2}>
          <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
          <Input
            sx={{ my: 2 }}
            fullWidth
            id="item-name"
            label="Price"
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            sx={{ my: 2 }}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            fullWidth
            id="standard-basic"
            label="Price"
            variant="standard"
            value={price.toString()}
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
          />

          <InputLabel htmlFor="standard-adornment-amount">
            Description
          </InputLabel>
          <TextField
            sx={{ my: 2 }}
            fullWidth
            multiline
            id="standard-basic"
            variant="filled"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />


          <InputLabel htmlFor="standard-adornment-amount">
            Allow Subscriptions
          </InputLabel>

          
          <Checkbox
                checked={allowSubscriptions}
                onChange={handleAllowSubscriptionsChange}
              />

          
          <ImageManager imageUrls={imageUrls} setImageUrls={setImageUrls} cli={cli} />
        </Box>
      </Container>
    </>
  );
}
