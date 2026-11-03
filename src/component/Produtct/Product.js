import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Product = (props) => {
 const {img , name, seller,price,stock, key} = props.products ;
console.log(props)
  return (
    <motion.div  className='header'
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  whileHover={{ y: -4 }}
  
  >

      <div className='imgs'>  
         <img src={img} alt=""/>
      </div>

      <div className='Parahej'>  
       <h3><Link to={`/product/${key}`}> {name}</Link></h3>   {/* dynamic route */}
        <p><small>by: {seller}</small></p>
        <p>${price}</p>
         {/* <br />  */}
        <p> onley {stock} left a stock - Order son</p>
        
        {/*<search> react conditionally render component </search> */}
      { 
        props.showAddToCrad && <button className='incruse' onClick={()=>props.handlrcluker(props.products)}><FontAwesomeIcon icon={faShoppingCart}/>add to card</button>
      }
      </div>
    </motion.div>
  
  );
};

export default Product;
