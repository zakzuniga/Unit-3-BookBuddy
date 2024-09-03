import React, { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch account details. Please log in again.');
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (!token) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div>
      <h2>Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>Your Checked-Out Books:</h3>
          <ul>
            {user.books && user.books.length > 0 ? (
              user.books.map(book => (
                <li key={book.id}>
                  <p><strong>{book.title}</strong> by {book.author}</p>
                  <img src={book.coverimage} alt={`${book.title} cover`} style={{ width: '100px', height: '150px' }} />
                </li>
              ))
            ) : (
              <p>You have no books checked out.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
};

export default Account;
