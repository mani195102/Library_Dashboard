import React, { useState, useEffect } from 'react';
import BookForm from './BookForm';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('https://library-dashboard.onrender.com/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
        setLoading(false);
      });
  };

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleBookSubmit = (values) => {
    if (selectedBook) {
      // Update existing book
      axios.put(`https://library-dashboard.onrender.com/books/${selectedBook._id}`, values)
        .then(response => {
          setBooks(books.map(book => book._id === selectedBook._id ? response.data : book));
          handleClose();
        })
        .catch(error => {
          console.error('Error updating book:', error);
          setError('Failed to update book');
        });
    } else {
      // Add new book
      axios.post('https://library-dashboard.onrender.com/books', values)
        .then(response => {
          setBooks([...books, response.data]);
          handleClose();
        })
        .catch(error => {
          console.error('Error adding book:', error);
          setError('Failed to add book');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://library-dashboard.onrender.com/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        setError('Failed to delete book');
      });
  };

  return (
    <div>
      <Button style={{ margin: '20px'}} variant="contained" color="secondary" onClick={() => handleOpen(null)}>Add Book</Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Publication Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.publicationDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(book)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(book._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
          <BookForm onSubmit={handleBookSubmit} initialValues={selectedBook || { title: '', author: '', isbn: '', publicationDate: '' }} />
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

export default Books;
