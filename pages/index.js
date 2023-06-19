import React from 'react';
import { Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleBooksLinkClick = (event) => {
    event.preventDefault();
    router.push('/Books');
  };

  return (
    <div>
      <Typography variant="h2" component="h1" align="center">
        Willkommen zur Startseite
      </Typography>
      <Typography variant="body1" component="p" align="center">
        Hier geht es zu den Büchern
      </Typography>
      <Typography variant="body1" component="p" align="center">
        <Link href="/Books" onClick={handleBooksLinkClick}>
          Bücher anzeigen
        </Link>
      </Typography>
    </div>
  );
};

export default Home;
