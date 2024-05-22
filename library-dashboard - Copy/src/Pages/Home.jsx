import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import AuthorForm from './AuthorForm';
import BookForm from './BookForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    
  }, []);

  const handleAuthorSubmit = (values, { resetForm }) => {
    if (selectedAuthor) {
      axios.put(`http://localhost:5000/authors/${selectedAuthor.id}`, values)
        .then(response => {
          setAuthors(authors.map(author => author.id === selectedAuthor.id ? response.data : author));
          setSnackbarMessage('Author updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setSelectedAuthor(null);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating author:', error);
          setError('Failed to update author');
          setSnackbarMessage('Failed to update author');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    } else {
      axios.post('http://localhost:5000/authors', { ...values, id: uuidv4() })
        .then(response => {
          setAuthors([...authors, response.data]);
          setSnackbarMessage('Author added successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setSelectedAuthor(null);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding author:', error);
          setError('Failed to add author');
          setSnackbarMessage('Failed to add author');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  };

  const handleBookSubmit = (values, { resetForm }) => {
    if (selectedBook) {
      axios.put(`http://localhost:5000/books/${selectedBook.id}`, values)
        .then(response => {
          setBooks(books.map(book => book.id === selectedBook.id ? response.data : book));
          setSnackbarMessage('Book updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setSelectedBook(null);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating book:', error);
          setError('Failed to update book');
          setSnackbarMessage('Failed to update book');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    } else {
      axios.post('http://localhost:5000/books', { ...values, id: uuidv4() })
        .then(response => {
          setBooks([...books, response.data]);
          setSnackbarMessage('Book added successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setSelectedBook(null);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding book:', error);
          setError('Failed to add book');
          setSnackbarMessage('Failed to add book');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  };

  return (
    <div style={{ padding: '1em' }}>
      <Typography style={{
        textAlign: 'center',
        borderRadius: '5px',
        marginBottom: '1.4em',
        color: '#fff',
        padding: '0.225em',
        backgroundColor: '#159de3'
      }} variant="h4" component="h1" gutterBottom>
        Library Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} style={{ padding: '1em' }}>
            <Typography variant="h6" gutterBottom>Author Form</Typography>
            <AuthorForm
              onSubmit={handleAuthorSubmit}
              initialValues={selectedAuthor || { name: '', biography: '', birthdate: '', image: '' }}
              authors={authors}
              selectedAuthor={selectedAuthor}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} style={{ padding: '1em' }}>
            <Typography variant="h6" gutterBottom>Book Form</Typography>
            <BookForm
              onSubmit={handleBookSubmit}
              initialValues={selectedBook || { title: '', author: '', isbn: '', publicationDate: '' }}
              books={books}
              selectedBook={selectedBook}
            />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Home;
