import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './App.css';

const LibraryRental = () => {
  const { addToCart } = useCart();
  const [rentalBooks, setRentalBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental books from the API
  useEffect(() => {
    const fetchRentalBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books'); // Backend API endpoint for rental books
        if (!response.ok) {
          throw new Error('Failed to fetch rental books');
        }
        const data = await response.json();
        setRentalBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRentalBooks();
  }, []);

  const handleRent = (book) => {
    const rentalItem = { ...book, isRental: true }; // Mark the book as a rental
    addToCart(rentalItem);
  };

  // Display loading or error state
  if (loading) {
    return <p>Loading rental books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render rental books
  return (
    <div >
      <h1>Library Book Rental</h1>
      {rentalBooks.length === 0 ? (
        <p>No rental books available</p>
      ) : (
        <ul>
          {rentalBooks.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Rental Price: ${book.rentalPrice}</p>
              <button onClick={() => handleRent(book)}>Rent</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryRental;
