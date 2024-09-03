import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleBook = ({ token }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBook(data.book);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to fetch book details. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleCheckout = async () => {
    if (!token) {
      alert('You need to log in to check out books.');
      return;
    }

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ available: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to check out the book');
      }

      const updatedBook = await response.json();
      setBook(updatedBook.book);
      alert('Book checked out successfully!');
    } catch (err) {
      console.error('Error checking out book:', err);
      setError('Failed to check out the book. Please try again.');
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details">
      {book ? (
        <>
          <h2>{book.title}</h2>
          <img src={book.coverimage} alt={`${book.title} cover`} style={{ width: '200px', height: '300px' }} />
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          {book.available ? (
            <p><strong>Status:</strong> Available</p>
          ) : (
            <p><strong>Status:</strong> Checked out</p>
          )}
          {token && book.available && (
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          )}
        </>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
};

export default SingleBook;
