import * as React from 'react';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useAuth } from '@/Contexts/Auth';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import BreadcrumbLinks from '@/Components/Breadcrumbs';
import moment from 'moment/moment';

const columns = [
  { field: 'item_name', headerName: 'Item', width: 200 },
  {
    field: 'created_by_name',
    headerName: 'Created By',
    width: 200,
  },
  {
    field: 'created_at',
    headerName: 'Ordered At',
    type:"number",
    width: 200,
    valueFormatter: (params) => {
        var date = new Date((params?.value)*1000)
        var time = moment(date).format('h:mm a on MMMM Do')
        return time
    },
  },
  { field: 'note', headerName: 'Note', width: 200 },
];

export default function CurrentOrders() {
    
    var breadcrumbLinks = [
        {href:"/",text:"Home"},
        {href:"/profile",text:"Profile"},
        {href:"/profile/currentOrders",text:"Current Orders"},
      ]    

  const { apiClient } = useAuth()
  var cli = apiClient.Client

  const [orders, setOrders] = React.useState([])
  const [completedOrders, setCompletedOrders] = React.useState([])

  const [pendingSelectedRows, setPendingSelectedRows] = React.useState([])
  const [completedSelectedRows, setCompletedSelectedRows] = React.useState([])

  React.useEffect(() => {
    cli.get(`order/list`).then((res)=>{
        var myOrders = res.data
        setOrders(myOrders.map(o=>{
            o.id = o.sk
            return o
        }))
    }).catch(err => {console.log(err)})
  }, [])

  function MarkCompleted(){
    var newOrders = []
    var newCompletedOrders = []
    for (let i = 0; i < orders.length; i++) {
        const e = orders[i];
        if (pendingSelectedRows.indexOf(e.id) > -1) {
            newCompletedOrders.push(e)
        } else {
            newOrders.push(e)
        }
    }
    setOrders(newOrders)
    setCompletedOrders([...newCompletedOrders,...completedOrders])
    setPendingSelectedRows([])
    setCompletedSelectedRows([])
  }
  function MarkIncomplete(){
    var newOrders = []
    var newCompletedOrders = []
    for (let i = 0; i < completedOrders.length; i++) {
        const e = completedOrders[i];
        if (completedSelectedRows.indexOf(e.id) > -1) {
            newOrders.push(e)
        } else {
            newCompletedOrders.push(e)
        }
    }
    
    setOrders([...newOrders,...orders])
    setCompletedOrders(newCompletedOrders)
    setPendingSelectedRows([])
    setCompletedSelectedRows([])
    
  }

  function CustomToolbar({completed}) {
    var text = "Mark Completed"
    var f = MarkCompleted
    if(completed){
        text = "Mark Incompleted"
        f = MarkIncomplete
    }
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button color='success' onClick={f}>{text}</Button>
        <GridToolbarQuickFilter sx={{marginLeft:"auto"}}/>
        
      </GridToolbarContainer>
    );
  }

  function CompletedToolBar(){
    return <CustomToolbar completed={true}/>
  }
  
    
  return (
    <Container>
        <Box sx={{ my: 4 }}>
            <BreadcrumbLinks links={breadcrumbLinks}/>
          </Box>
        <Typography variant="h4" component="h1" gutterBottom>
            Pending Orders
        </Typography>
        <Box height={550} my={3}>
            <DataGrid
                rows={orders}
                columns={columns}

                pageSizeOptions={[5,10,20,100]}
                checkboxSelection
                onRowSelectionModelChange={(res)=>{setPendingSelectedRows(res)}}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
                }}
            />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
            Completed Orders
        </Typography>
        <Box height={550} my={3}>
            <DataGrid
                rows={completedOrders}
                columns={columns}

                pageSizeOptions={[5,10,20,100]}
                checkboxSelection
                onRowSelectionModelChange={(res)=>{setCompletedSelectedRows(res)}}
                slots={{ toolbar: CompletedToolBar }}
                slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
                }}
            />
        </Box>
    </Container>
  );
}