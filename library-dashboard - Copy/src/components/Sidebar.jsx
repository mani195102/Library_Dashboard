import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 style={{ textAlign: 'center', padding: '0.4em' }}>Library Dashboard</h3>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText style={{ borderBottom: '1px solid #fff' }} primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/authors">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText style={{ borderBottom: '1px solid #fff' }} primary="Authors" />
        </ListItem>
        <ListItem button component={Link} to="/books">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText style={{ borderBottom: '1px solid #fff' }} primary="Books" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
