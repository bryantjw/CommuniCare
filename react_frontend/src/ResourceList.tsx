import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setResources(data);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch(error => {
        setError('Error fetching resources');
        console.error('Error fetching resources:', error);
      });
  }, []);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" gutterBottom>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Available Community Resources
      </Typography>
      {resources.map((resource) => (
        <Card key={resource.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {resource.name}
            </Typography>
            <Typography color="text.secondary">
              {resource.type} - {resource.location}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default ResourceList;