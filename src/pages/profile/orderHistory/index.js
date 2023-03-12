import * as React from 'react';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useAuth } from '@/Contexts/Auth';
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import BreadcrumbLinks from '@/Components/Breadcrumbs';
import moment from 'moment/moment';
import Link from '@/Link';

function ItemDisplay({cellValues}){
  var uri = `/item/${encodeURIComponent(cellValues.row?.item_id)}`
  return <Link href={uri} onClick={()=>{}}>{cellValues.row?.item_name}</Link>
}

const columns = [
  { 
    field: 'item_name', 
    renderCell:(cellValues)  => <ItemDisplay cellValues={cellValues}/>,
    headerName: 'Item', 
    width: 200, 
  },
  {
    field: 'created_by_name',
    headerName: 'Created By',
    width: 200,
  },
  {
    field: 'created_at',
    headerName: 'Time',
    type:"number",
    width: 200,
    valueFormatter: (params) => {
        var date = new Date((params?.value)*1000)
        var time = moment(date).format('h:mm:ss a, Do MMMM YYYY')
        return time
    },
  },
  { field: 'note', headerName: 'Note', width: 200 },
];

export default function OrderHistoryPage() {
    
  var {isAuthenticated} = useAuth()
  if(!isAuthenticated()){
    window.location.href = "/";
  }
    var breadcrumbLinks = [
        {href:"/",text:"Home"},
        {href:"/profile",text:"Profile"},
        {href:"/profile/orderHistory",text:"Shop Order History"},
      ]    

  const { apiClient } = useAuth()
  var cli = apiClient.Client

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    cli.get(`order/list`).then((res)=>{
        var myOrders = res.data
        setOrders(myOrders.map(o=>{
            o.id = o.sk
            return o
        }))
    }).catch(err => {console.log(err)})
  }, [])

  
    
  return (
    <Container>
        <Box sx={{ my: 4 }}>
          <BreadcrumbLinks links={breadcrumbLinks}/>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
            Completed Orders
        </Typography>
        
        <Box height={550} my={3}>
            <DataGrid
                rows={orders}
                columns={columns}
                initialState={{
                  pagination:{paginationModel:{pageSize:10}}
                }}
                pageSizeOptions={[5,10,20,100]}
                slots={{ toolbar: GridToolbar }}
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