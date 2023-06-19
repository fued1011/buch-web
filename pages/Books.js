import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  InputLabel,
} from '@mui/material';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [format, setFormat] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openNewBookDialog, setOpenNewBookDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    isbn: '',
    rating: 0,
    art: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
    titel: { titel: '', untertitel: '' }
  });


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:3000/rest');
        const data = await response.json();
        const comichefte = data._embedded.comichefte;
        setBooks(comichefte);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = books;

      if (searchTerm) {
        filtered = filtered.filter((book) =>
          book.titel.titel.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter((book) =>
          book.schlagwoerter.includes(category)
        );
      }

      if (format) {
        filtered = filtered.filter((book) => book.art === format);
      }

      if (availableOnly) {
        filtered = filtered.filter((book) => book.lieferbar);
      }

      setFilteredBooks(filtered);
    };

    applyFilters();
  }, [books, searchTerm, category, format, availableOnly]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleAvailableOnlyChange = (event) => {
    setAvailableOnly(event.target.checked);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
  };

  const handleOpenNewBookDialog = () => {
    setOpenNewBookDialog(true);
  };

  const handleCloseNewBookDialog = () => {
    setOpenNewBookDialog(false);
  };

  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };
  const handleSchlagwortChange = (e) => {
    const { value, checked } = e.target;
    const updatedSchlagwoerter = checked
      ? [...newBook.schlagwoerter, value]
      : newBook.schlagwoerter.filter((schlagwort) => schlagwort !== value);
    setNewBook((prevBook) => ({ ...prevBook, schlagwoerter: updatedSchlagwoerter }));
  };

  const handleCreateBook = () => {
    // Senden des POST-Requests an https://localhost:3000/rest
    fetch('https://localhost:3000/rest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Book created:', data);
        // Zurücksetzen des Formulars
        setNewBook({
          isbn: '',
          rating: 0,
          art: '',
          preis: 0,
          rabatt: 0,
          lieferbar: false,
          datum: '',
          homepage: '',
          schlagwoerter: [],
          titel: { titel: '', untertitel: '' }
        });
        setOpenNewBookDialog(false);
      })
      .catch((error) => {
        console.error('Error creating book:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Books
      </Typography>

      <div>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          sx={{ mb: 2 }}
        />

        <FormControl sx={{ mb: 2 }}>
          <InputLabel htmlFor="category-select">Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            inputProps={{ id: 'category-select' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="BATMAN">BATMAN</MenuItem>
            <MenuItem value="IRONMAN">IRONMAN</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <InputLabel htmlFor="format-select">Format</InputLabel>
          <Select
            value={format}
            onChange={handleFormatChange}
            inputProps={{ id: 'format-select' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="DRUCKAUSGABE">DRUCKAUSGABE</MenuItem>
            <MenuItem value="KINDLE">KINDLE</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={availableOnly}
              onChange={handleAvailableOnlyChange}
            />
          }
          label="Available Only"
        />
      </div>
      <Button onClick={handleOpenNewBookDialog} color="primary" variant="contained">
        Add New Book
      </Button>
      <Dialog open={openNewBookDialog} onClose={handleCloseNewBookDialog}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="ISBN"
              name="isbn"
              value={newBook.isbn}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={newBook.rating}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Art"
              name="art"
              value={newBook.art}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Preis"
              name="preis"
              type="number"
              value={newBook.preis}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rabatt"
              name="rabatt"
              type="number"
              value={newBook.rabatt}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <FormControl sx={{ mt: 2 }}>
              <InputLabel htmlFor="lieferbar-checkbox">Lieferbar</InputLabel>
              <Checkbox
                id="lieferbar-checkbox"
                name="lieferbar"
                checked={newBook.lieferbar}
                onChange={(e) => setNewBook((prevBook) => ({ ...prevBook, lieferbar: e.target.checked }))}
              />
            </FormControl>
            <TextField
              label="Datum"
              name="datum"
              type="date"
              value={newBook.datum}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Homepage"
              name="homepage"
              value={newBook.homepage}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <FormControl sx={{ mt: 2 }}>
              <InputLabel htmlFor="schlagwoerter-checkbox-group">Schlagwörter</InputLabel>
              <FormGroup id="schlagwoerter-checkbox-group">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="BATMAN"
                      checked={newBook.schlagwoerter.includes('BATMAN')}
                      onChange={handleSchlagwortChange}
                    />
                  }
                  label="BATMAN"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="IRONMAN"
                      checked={newBook.schlagwoerter.includes('IRONMAN')}
                      onChange={handleSchlagwortChange}
                    />
                  }
                  label="IRONMAN"
                />
              </FormGroup>
            </FormControl>
            <TextField
              label="Titel"
              name="titel.titel"
              value={newBook.titel.titel}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Untertitel"
              name="titel.untertitel"
              value={newBook.titel.untertitel}
              onChange={handleNewBookChange}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewBookDialog}>Cancel</Button>
          <Button onClick={handleCreateBook} color="primary" variant="contained">
            Add Book
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {filteredBooks.map((book) => (
          <ListItem key={book.isbn} button onClick={() => handleBookClick(book)}>
            <ListItemText primary={book.titel.titel} secondary={book.titel.untertitel} />
          </ListItem>
        ))}
      </List>

      <Dialog open={Boolean(selectedBook)} onClose={handleCloseDialog}>
        <DialogTitle>{selectedBook?.titel?.titel}</DialogTitle>
        <DialogContent>
          <Typography>{selectedBook?.titel?.untertitel}</Typography>
          <Typography>ISBN: {selectedBook?.isbn}</Typography>
          <Typography>Rating: {selectedBook?.rating}</Typography>
          <Typography>Art: {selectedBook?.art}</Typography>
          <Typography>Preis: {selectedBook?.preis}</Typography>
          <Typography>Rabatt: {selectedBook?.rabatt}</Typography>
          <Typography>Lieferbar: {selectedBook?.lieferbar ? 'Ja' : 'Nein'}</Typography>
          <Typography>Datum: {selectedBook?.datum}</Typography>
          <Typography>Homepage: {selectedBook?.homepage}</Typography>
          <Typography>Schlagwörter: {selectedBook?.schlagwoerter?.join(', ')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Books;






