import React from 'react';
import './Remove.css';
import { motion } from 'motion/react';


//useSTATe Load data
const Remove = (props) => {
    const { name, quantity, key, img, price } = props.pd; // props data load Review.js and Card useState sent data
   
    return (
        <motion.div className="remove-item"
               style={{ originX: 0.5 }}    >

            <div className="remove-img">
                <img src={img} alt="" />
            </div>
            <div className="remove-info" >
                <h3>{name}</h3>

                <h4>Price: ${price}</h4>
                <h5>Quantity: {quantity}</h5>
                <button
                    className="remove-btn"
                    onClick={() => props.Handleremove(key)} //immdiete call arrow fun .stop this
                >Remove</button>
            </div>
        </motion.div>
    );
};

export default Remove;