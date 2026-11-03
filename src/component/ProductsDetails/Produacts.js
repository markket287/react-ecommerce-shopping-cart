// import React from 'react';
// import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
// import Product from '../Produtct/Product';


// const Produacts = () => {
//   const { productKey } = useParams(); //load data from url dynamic sent data [userrams] ProductsDetails.js compoent
//   const  product =fakeData.find(pd => pd.key === productKey);
  
    
//   return (<>
//       <Product showAddToCrad={true}  products={product}></Product>
//     </>)
// };

// export default Produacts;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Produtct/Product';
import Card from '../Card/Card';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';


const Produacts = () => {
  const { productKey } = useParams(); //load data from url dynamic sent data [userrams] ProductsDetails.js compoent
  const product = fakeData.find(pd => pd.key === productKey);

  const [card, setCard] = useState([]);

  // load saved cart from localStorage
  useEffect(() => {
    const dataloadMnage = getDatabaseCart();
    const keybarkor = Object.keys(dataloadMnage);
    const pewvieskey = keybarkor.map(pdkey => {
      const productFind = fakeData.find(find => find.key === pdkey);
      productFind.quantity = dataloadMnage[pdkey];
      return productFind;
    });
    setCard(pewvieskey);
  }, []);

  // same add to cart logic as Shop.js
  const handlrcluker = (products) => {
    const tobeadded = products.key;
    const sameProdu = card.find(pd => pd.key === tobeadded);
    let count = 1;
    let newCard;
    if (sameProdu) {
      count = sameProdu.quantity + 1;
      sameProdu.quantity = count;
      const ohter = card.filter(pd => pd.key !== tobeadded);
      newCard = [...ohter, sameProdu];
    } else {
      products.quantity = 1;
      newCard = [...card, products];
    }
    setCard(newCard);
    addToDatabaseCart(products.key, count);
  };

  return (
    <div className="shop-cointerner">
      <div className="produts-cointernar" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <Product showAddToCrad={true} handlrcluker={handlrcluker} products={product}></Product>
      </div>

      <div className="card-cointenar">
        <Card card={card}>
          <Link to="/Review"><button style={{padding:"10px",backgroundColor:"goldenrod"}}>Review Card</button></Link>
        </Card>
      </div>
    </div>
  );
};

export default Produacts;