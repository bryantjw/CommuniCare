import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Snackbar } from '@mui/material';

const AddResource = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!name || !type || !location) {
      alert('Please fill in all fields.');
      return;
    }

    const resource = { name, type, location };

    fetch('http://localhost:5000/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resource),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setOpenSnackbar(true);
      setName('');
      setType('');
      setLocation('');
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Type" variant="outlined" value={type} onChange={(e) => setType(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Location" variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Resource
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Resource added successfully!"
      />
    </Paper>
  );
};

export default AddResource;
