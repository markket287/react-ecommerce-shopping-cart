import React from "react";
import logo from "../../../src/Img/shop-header-banner-wide.png";
import "../../component/Header/Header.css";
 const Header = () => {
   return(
    <div className ="addcss">
      <div className="hero">
      <img src={logo} alt="Neon Shop Smart Banner" />
      </div>
    <nav>
      <a href="/Shop">shop</a>
      <a href="/Review">Oder review</a>
      <a href="/Manage">Manage Inavantory</a>
    </nav>
    </div>
   )
 
 
 
};





























 export default Header ;