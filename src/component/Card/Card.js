import React from 'react';
import "./Card.css";



const Card = (props) => {
    const card = props.card;
    // const  total = card.reduce((total , pd) => total + pd.price, 0)
   let total=0 ;

   
for (let i = 0; i < card.length; i++) {
  const product = card[i];
//  console.log(product);
   total = total + product.price * product.quantity;
 // debugger; Fixed spelling
}

    
    let shipping = 0;

    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = total / 10 ;
    
    
    
    const Mathrounds =bitorenum =>{
        const returns =bitorenum.toFixed(2);
        return Number(returns)  //Number = Convat
    }
    const grandsTotal =(total + shipping + Number(tax)).toFixed(2) ;
   
   
    //------------------HTML--------------------------------------  
    return (
        <div className ="cointernar">
          <div className="oder-summery" > 
            <h3 >Oder summary : For Card.js</h3>
            <p>Item ordered : {card.length}</p>
          </div>          
            <p>Price : {Mathrounds(total)} $</p>
            <p>Tax + Vat : {Mathrounds(tax)} $</p>
            <p><small>Shipping Cost : {Mathrounds(shipping)} $</small></p>
            <p>total Price ki : $ {(grandsTotal)}</p>
            <br />
            {
                props.children
            }
           
            {/* //review.js file er card component e data pathano hoise props hisabe */}
        </div>
    );
};

export default Card;