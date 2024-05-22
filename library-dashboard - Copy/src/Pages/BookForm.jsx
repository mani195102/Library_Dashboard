import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const BookForm = ({ onSubmit, initialValues }) => {
  // Define validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication Date is required')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="title"
            as={TextField}
            label="Title"
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
            fullWidth
            margin="normal"
          />
          <Field
            name="author"
            as={TextField}
            label="Author"
            error={touched.author && !!errors.author}
            helperText={touched.author && errors.author}
            fullWidth
            margin="normal"
          />
          <Field
            name="isbn"
            as={TextField}
            label="ISBN"
            error={touched.isbn && !!errors.isbn}
            helperText={touched.isbn && errors.isbn}
            fullWidth
            margin="normal"
          />
          <Field
            name="publicationDate"
            as={TextField}
            label="Publication Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={touched.publicationDate && !!errors.publicationDate}
            helperText={touched.publicationDate && errors.publicationDate}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
