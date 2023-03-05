import { useAuth } from "@/Contexts/Auth"
import { Box, Button, Grid, Paper } from "@mui/material"
import React from "react"
import ItemView from "./Item"

import AddIcon from '@mui/icons-material/Add';
import AddItemButton from "./AddItemView";



export function ItemList(){
  
    const {apiClient} = useAuth()
    var cli = apiClient.Client
  
    const [items, setItems] = React.useState([])
    
    React.useEffect(() => {
      var uri = encodeURIComponent(`producer/${apiClient.producer.sk}/items`)
  
      cli.get(uri).then(res => {
        setItems(res.data)
      })
  
    }, [])

    

    function addNewItem(newItem){
      if(newItem){
        setItems([newItem,...items])
      }
    }

    function editItem(editedItem){
      if(editedItem && editedItem.sk){
        setItems(items.map(item=>{
          if(item.sk == editedItem.sk){
            return editedItem
          }
          else{
            return item
          }
        }))
      }
    }
    
  
    return(
      <Box>
        <Grid container rowSpacing={4} >
            <Grid item xs={12} key={0}>
                <AddItemButton addNewItem={addNewItem}/>
            </Grid>
            {items.map((item,i) => {
            return <GridItem key={i+1} item={item} editItem={editItem}/>
            
            })}
        </Grid>
      </Box>
    )
  }


function GridItem({item,editItem}){
    return (
        <Grid item xs={4}>
            <ItemView itemData={item} editItem={editItem} />
        </Grid>
    )
}