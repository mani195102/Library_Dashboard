import React, { useState, useEffect } from 'react';
import AuthorForm from './AuthorForm';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  // Import uuidv4

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/authors')
      .then(response => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        setError('Failed to fetch authors');
        setLoading(false);
      });
  }, []);

  const handleOpen = (author) => {
    setSelectedAuthor(author);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAuthor(null);
  };

  const handleAuthorSubmit = (values) => {
    if (selectedAuthor) {
      axios.put(`http://localhost:5000/authors/${selectedAuthor.id}`, values)
        .then(response => {
          setAuthors(authors.map(author => author.id === selectedAuthor.id ? response.data : author));
          handleClose();
        })
        .catch(error => {
          console.error('Error updating author:', error);
          setError('Failed to update author');
        });
    } else {
      axios.post('http://localhost:5000/authors', { ...values, id: uuidv4() })
        .then(response => {
          setAuthors([...authors, response.data]);
          handleClose();
        })
        .catch(error => {
          console.error('Error adding author:', error);
          setError('Failed to add author');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/authors/${id}`)
      .then(() => setAuthors(authors.filter(author => author.id !== id)))
      .catch(error => {
        console.error('Error deleting author:', error);
        setError('Failed to delete author');
      });
  };

  return (
    <div>
      <Button style={{ margin: '20px'}} variant="contained" color="secondary" onClick={() => handleOpen(null)}>Add Author</Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Biography</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author, index) => (
              <TableRow key={index}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.biography}</TableCell>
                <TableCell>{author.birthdate}</TableCell>
                <TableCell><img src={author.image} alt={author.name} width="100" /></TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(author)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(author.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedAuthor ? 'Edit Author' : 'Add Author'}</DialogTitle>
        <DialogContent>
          <AuthorForm onSubmit={handleAuthorSubmit} initialValues={selectedAuthor || { name: '', biography: '', birthdate: '', image: '' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </div>
  );
};

export default Authors;
