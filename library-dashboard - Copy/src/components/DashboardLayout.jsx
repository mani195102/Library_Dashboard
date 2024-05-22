import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <Drawer variant="permanent" anchor="left">
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/authors">
        <ListItemText primary="Authors" />
      </ListItem>
      <ListItem button component={Link} to="/books">
        <ListItemText primary="Books" />
      </ListItem>
    </List>
  </Drawer>
);

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
