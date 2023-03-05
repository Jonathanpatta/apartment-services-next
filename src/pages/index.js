import {ConsumerItemListView, ConsumerItemView} from "@/Components/Item/ConsumerItemView";
import Topbar from "@/Components/Topbar";
import { AuthProvider } from "@/Contexts/Auth";
import Link from "@/Link";
import { Box, Container, Typography } from "@mui/material";

export default function Index() {
  return (
    <AuthProvider>
      <Container >
        <Topbar/>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Trending Items
          </Typography>
          <ConsumerItemListView />
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Trending Services
          </Typography>
        </Box>
      </Container>
    </AuthProvider>
  );
}