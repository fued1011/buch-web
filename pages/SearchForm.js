import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    subtitle: '',
    rating: 0,
    price: 0,
    releaseDate: '',
    category: '',
    format: '',
    available: false,
  });
  const [searchFormOpen, setSearchFormOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    category: '',
    format: '',
    available: false,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:3000/rest');
        const data = await response.json();
        setBooks(
          data._embedded.comichefte.map((book) => ({
            ...book,
            available: book.lieferbar,
          }))
        );
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.titel.titel.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchParams.category === '' ||
          book.category === searchParams.category) &&
        (searchParams.format === '' || book.format === searchParams.format) &&
        (searchParams.available === false ||
          book.available === searchParams.available)
    );
    setFilteredBooks(filtered);
  }, [books, searchTerm, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleExpand = (book) => {
    if (expandedBook === book.isbn) {
      setExpandedBook(null);
    } else {
      setExpandedBook(book.isbn);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('https://localhost:3000/rest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();
      setBooks([...books, data]);
      setNewBook({
        isbn: '',
        title: '',
        subtitle: '',
        rating: 0,
        price: 0,
        releaseDate: '',
        category: '',
        format: '',
        available: false,
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleSearchParamsChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Books
      </Typography>
      <Button
        variant="contained"
        onClick={() => setSearchFormOpen(!searchFormOpen)}
        sx={{ mb: 2 }}
      >
        {searchFormOpen ? 'Close Search Form' : 'Open Search Form'}
      </Button>
      <Collapse in={searchFormOpen}>
        <form onSubmit={handleSearch}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={searchParams.category}
              onChange={handleSearchParamsChange}
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="action">Action</MenuItem>
              <MenuItem value="drama">Drama</MenuItem>
              <MenuItem value="comedy">Comedy</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <InputLabel>Format</InputLabel>
            <Select
              name="format"
              value={searchParams.format}
              onChange={handleSearchParamsChange}
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="hardcover">Hardcover</MenuItem>
              <MenuItem value="paperback">Paperback</MenuItem>
              <MenuItem value="ebook">Ebook</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.available}
                onChange={handleSearchParamsChange}
                name="available"
              />
            }
            label="Available"
          />
          <Button variant="contained" type="submit">
            Search
          </Button>
        </form>
      </Collapse>
      <List>
        {filteredBooks.map((book) => (
          <ListItem key={book.isbn} onClick={() => handleExpand(book)}>
            <ListItemText primary={book.title} secondary={book.subtitle} />
            {expandedBook === book.isbn ? (
              <div>
                <Typography>Rating: {book.rating}</Typography>
                <Typography>Price: {book.price}</Typography>
                <Typography>Release Date: {book.releaseDate}</Typography>
                <Typography>Category: {book.category}</Typography>
                <Typography>Format: {book.format}</Typography>
                <Typography>
                  Available: {book.available ? 'Yes' : 'No'}
                </Typography>
              </div>
            ) : null}
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Add a New Book
      </Typography>
      <form onSubmit={handleAddBook}>
        <TextField
          label="ISBN"
          name="isbn"
          value={newBook.isbn}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Title"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Subtitle"
          name="subtitle"
          value={newBook.subtitle}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="number"
          label="Rating"
          name="rating"
          value={newBook.rating}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="number"
          label="Price"
          name="price"
          value={newBook.price}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="date"
          label="Release Date"
          name="releaseDate"
          value={newBook.releaseDate}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={newBook.category}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="action">Action</MenuItem>
            <MenuItem value="drama">Drama</MenuItem>
            <MenuItem value="comedy">Comedy</MenuItem>
          </Select>
        </FormControl>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <RadioGroup
            row
            name="format"
            value={newBook.format}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="hardcover"
              control={<Radio />}
              label="Hardcover"
            />
            <FormControlLabel
              value="paperback"
              control={<Radio />}
              label="Paperback"
            />
            <FormControlLabel
              value="ebook"
              control={<Radio />}
              label="Ebook"
            />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={newBook.available}
              onChange={handleInputChange}
              name="available"
            />
          }
          label="Available"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">
          Add Book
        </Button>
      </form>
    </div>
  );
};

export default Books;
