import React from 'react';
import { Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Home = () => {
  const router = useRouter();

  const handleBooksLinkClick = (event) => {
    event.preventDefault();
    router.push('/Books');
  };

  return (
    <div
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')", // Hintergrundbild
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)" // Schatten hinzufügen
    }}
  >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor="rgba(255, 255, 255, 0.4)" // Hintergrundfarbe mit Transparenz
    >
      <Typography variant="h2" component="h1" align="center">
        Willkommen zur Startseite
      </Typography>
      <Typography variant="body1" component="p" align="center">
        Hier geht es zu den Büchern
      </Typography>
      <Typography variant="body1" component="p" align="center">
        <Button variant="contained" color="secondary" href="/Books" onClick={handleBooksLinkClick}>
          Bücher anzeigen
        </Button>
      </Typography>
    </Box>
  </div>
  );
};

export default Home;
