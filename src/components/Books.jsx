import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBooks(data.books);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-list">
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>No books available at the moment.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <div className="book-item">
                  <img src={book.coverimage} alt={`${book.title} cover`} style={{ width: '100px', height: '150px' }} />
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
