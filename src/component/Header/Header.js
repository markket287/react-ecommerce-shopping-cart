import React from "react";
import logo from "../../../src/Img/shop-header-banner-wide.png";
import "../../component/Header/Header.css";
import { Link } from "react-router-dom";
 const Header = () => {
   return(
    <div className ="addcss">
      <div className="hero">
      <img src={logo} alt="Neon Shop Smart Banner" />
      </div>
    <nav>
      <Link to="/Shop">shop</Link>
      <Link to="/Review">Oder review</Link>
      <Link to="/Manage">Manage Inavantory</Link>
    </nav>
    </div>
   )
 
 
 
};





























 export default Header ;