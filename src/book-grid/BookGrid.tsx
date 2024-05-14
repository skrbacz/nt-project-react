import React from 'react';
import Grid from '@mui/material/Grid';
import Book from '../book/Book';
import './BookGrid.css';
import Typography from '@mui/material/Typography';

const books = [
  {
    id: 1,
    title: 'Stina Blackstenius- Queen of Sweeden',
    author: 'Katie McCabe',
    yearPublished: 2024,
    photo: 'https://pbs.twimg.com/media/GKBciQIXUAALE7i.jpg:large',
    avaliableCopies: 2,
  },
  {
    id: 2,
    title: "TIL IT'S DONE",
    author: 'Toni Gustavson',
    yearPublished: 2023,
    photo: 'https://pbs.twimg.com/media/Fzmnk7DWwAA678n.jpg',
    avaliableCopies: 0,
  },
  {
    id: 3,
    title: 'From Steve to all Stevies',
    author: 'Steve',
    yearPublished: 2009,
    photo:
      'https://image.ceneostatic.pl/data/products/47570063/i-minecraft-java-edition-digital.jpg',
    avaliableCopies: 1,
  },
  {
    id: 4,
    title: 'Blood of elves',
    author: 'Andrzej Sapkowski',
    yearPublished: 1994,
    photo:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589998653i/6043781.jpg',
    avaliableCopies: 2,
  },
  {
    id: 5,
    title: 'Spiderman: Across The Spider-verse',
    author: 'Miles Morales',
    yearPublished: 2023,
    photo:
      'https://w0.peakpx.com/wallpaper/829/612/HD-wallpaper-spider-man-across-the-spider-verse-thumbnail.jpg',
    avaliableCopies: 2,
  },
  {
    id: 5,
    title: 'How to survive zombie apocalypse',
    author: 'Ellie Williams',
    yearPublished: 2023,
    photo:
      'https://assetsio.gnwcdn.com/co5zks.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
    avaliableCopies: 2,
  },
  {
    id: 6,
    title: 'What if...',
    author: 'V',
    yearPublished: 2020,
    photo:
      'https://wallpapers.com/images/featured/cyberpunk-android-xfg3bco65gskap3f.jpg',
    avaliableCopies: 2,
  },
  {
    id: 7,
    title: 'Book',
    author: 'Book',
    yearPublished: 8004,
    photo:
      'https://static.vecteezy.com/system/resources/previews/005/377/487/original/cartoon-doodle-book-isolated-on-white-background-education-hand-drawn-icon-free-vector.jpg',
    avaliableCopies: 2,
  },
  {
    id: 8,
    title: 'Corgies, my dogs <3',
    author: 'Queen Elizabeth',
    yearPublished: 1999,
    photo:
      'https://pcdn.bellfordev.pro/image/cache/catalog/Blog/Blog-Pictures/corgi-w690-h690.jpg',
    avaliableCopies: 2,
  },
  {
    id: 9,
    title: 'Garfield- the spicy red cat',
    author: 'Jon',
    yearPublished: 1978,
    photo:
      'https://cdn.kobo.com/book-images/89aaa282-5a1e-442b-8c20-b8ad717f613b/1200/1200/False/garfield-vol-5-3.jpg',
    avaliableCopies: 2,
  },
  {
    id: 10,
    title: 'We brought it home for the first time since 1966!',
    author: 'Leah Williamson',
    yearPublished: 2022,
    photo:
      'https://m.media-amazon.com/images/I/81fCBCYuqEL._AC_UF894,1000_QL80_.jpg',
    avaliableCopies: 2,
  },
  {
    id: 11,
    title: 'queen of rnb- kehlani',
    author: 'os',
    yearPublished: 2024,
    photo:
      'https://thatgrapejuice.net/wp-content/uploads/2022/04/kehlani-nme-tgj.jpg',
    avaliableCopies: 2,
  },
];

function BookGrid() {
  return (
    <div>
      <div className="list-of-books-text">
        <Typography variant="h5">List of books</Typography>
      </div>
       <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item key={book.id} xs={2} sm={2} md={2}>
          <div className="book-container">
            <Book
              id={book.id}
              title={book.title}
              author={book.author}
              yearPublished={book.yearPublished}
              photo={book.photo}
              avaliableCopies={book.avaliableCopies}
            />
          </div>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default BookGrid;
