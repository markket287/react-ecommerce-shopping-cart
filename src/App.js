import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/shop/Shop';
import Review from './component/Review/Review';
import ProductsDetails from './component/ProductsDetails/Produacts';
import Home from './component/Home/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (<div className="scroll-effect">
    <Router>

      <Header />{/*------------ component */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Review" element={<Review />} /> {/* component load sent with Card compont=element={<Review />} */}
        <Route path="/product/:productKey" element={<ProductsDetails />} />
        <Route path="*" element={<h1 style={{ color: "red", textAlign:'center' }}> 404 - Page Not Found </h1>} />
      </Routes>

    </Router>
  </div>);
}

export default App;
