import React, { useState } from 'react';  // Added useState import
import logo from './logo.png';
import './App.css';
import Login from './Login';
import backgroundimage from './bookstech.png';
import Bookshop from './BookShop';
import CartDisplay from './CartDisplay';
import { CartProvider } from './CartContext'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LibraryRental from './LibraryRental';
import ContactUs from './ContactUs';
import SignUp from './SignUp';

function App() {
  const reviews = [
    { text: "Amazing library management system! So easy to use.", stars: 5 },
    { text: "Great experience, found all the books I needed.", stars: 4 },
    { text: "User-friendly and very efficient.", stars: 5 },
    { text: "Good service, but can be improved in some areas.", stars: 3 },
    { text: "Loved the collection of books!", stars: 4 },
  ];

  const generateStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  const getRandomReviews = () => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Defined isLoggedIn with useState

  // This function will be passed to the Login component to update the state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const randomReviews = getRandomReviews();

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <title>BookVault Developers</title>
          <header className="App-header">
            <img className="image" src={logo} alt="Logo" />
            <h1 className="header">WELCOME TO OUR LIBRARY MANAGEMENT SYSTEM</h1>
            <nav className="nav" id="navbar">
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/bookshop">Shop Books</Link></li>
                <li><Link to="/library">Library/Book Rental</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/signup">Sign Up!</Link></li>
              </ul>
            </nav>

            {/* Conditionally render the login form */}
            <div className="login-container">
              {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
            </div>
          </header>

          {/* Cart Display - Always Visible */}
          <CartDisplay />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="background-container">
                    <img className="backgroundimage" src={backgroundimage} alt="Background" />
                  </div>

                  <div className="reviews-section">
                    <h2>User Reviews</h2>
                    <div className="reviews-container">
                      {randomReviews.map((review, index) => (
                        <div key={index} className="review-card">
                          <div className="stars">{generateStars(review.stars)}</div>
                          <p className="review-text">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/bookshop" element={<Bookshop />} />
            <Route path="/library" element={<LibraryRental />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
