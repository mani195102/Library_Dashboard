import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const AuthorForm = ({ onSubmit, initialValues }) => {
  const [imagePreview, setImagePreview] = useState(initialValues.image);

  // Define validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    biography: Yup.string().required('Biography is required'),
    birthdate: Yup.date().required('Birthdate is required'),
    image: Yup.mixed().required('Image is required')
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue('image', reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <Field
            name="name"
            as={TextField}
            label="Name"
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            fullWidth
            margin="normal"
          />
          <Field
            name="biography"
            as={TextField}
            label="Biography"
            error={touched.biography && !!errors.biography}
            helperText={touched.biography && errors.biography}
            fullWidth
            margin="normal"
          />
          <Field
            name="birthdate"
            as={TextField}
            label="Birthdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={touched.birthdate && !!errors.birthdate}
            helperText={touched.birthdate && errors.birthdate}
            fullWidth
            margin="normal"
          />
       <Button variant="contained" color="secondary" component="label">
          Upload Image
          <input
            name="image"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, setFieldValue)}
          />
        </Button>
          {touched.image && errors.image && <div>{errors.image}</div>}
          {imagePreview && <img src={imagePreview} alt="Image Preview" width="100" />}
          <Button  style={{ display: 'block',marginTop:'15px' }} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthorForm;
