import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';


const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then(response => response.json())
      .then(data => setResources(data));
  }, []);

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
