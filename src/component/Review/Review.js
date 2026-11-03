import React, { useEffect, useState} from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Remove from '../RemoveIteam/Remove';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import { processOrder } from '../../utilities/databaseManager';
import giphy from "../../Img/giphy.gif";

const Review = () => {
    const [card, setCard] =useState([]);// card.js DATABRASED LOAD DATA FOR CARD COMPONENT AND LOAD LOCALHost STROAGE DATA
    const [orderPlaced, setOrderPlaced] =useState(false);// Pleace Oeder <button/> click handler

const handlePlaceOrder =()=>{

    setCard([]) //card.js empty data sent to card.js go all emty
    setOrderPlaced(true) 
    processOrder()
}



// Delate item from card.js and localstorage
    const Handleremove =(productKey)=>{
        const delateCard = card.filter(load => load.key !== productKey);
        setCard(delateCard)
       removeFromDatabaseCart(productKey)
   }


useEffect(()=>{
        //loaddata for card compoenent
    const dataloadMnage =getDatabaseCart(); //loadata utilities/databaseManager.js
    const productKeys = Object.keys(dataloadMnage);

    //    const productValues = Object.values(dataloadMnage);
    const prroductsmanufacture =productKeys.map(key =>{
        const dtaloasfake= fakeData.find(pd => pd.key === key);
        dtaloasfake.quantity =dataloadMnage[key];
        return dtaloasfake
    }) 
   setCard(prroductsmanufacture); //sent data to card useState
    },[]);

 let thankyou ;
 if(orderPlaced){
   thankyou = <img src={giphy} alt="" />
    }  

     return (<>
      <marquee behavior="" style={{ backgroundColor: "black", width:"100%", height:"50px" }}>
        <h3 style={{background :'linear-gradient(90deg, #ff007f, #7f00ff)',textAlign:'center',borderRadius:"5px", }}>WelCoome To Review Compoent </h3></marquee> 


<div className="shop-cointerner">
    
   <div className="produts-cointernar">
         {
            card.map( pd => <Remove
                 pd ={pd} 
                 key={pd.key}
                 Handleremove={Handleremove}
                 ></Remove>) //data sent to Remove.js|pd ={pd} pass data
        }
        {thankyou}
    </div>

    <div className="card-cointenar">  {/* card load to card.js */} 

        <Card card={card}>
            <button onClick={handlePlaceOrder} style={{padding:"10px",backgroundColor:"goldenrod"}}>Place Order</button>
        </Card> 

    </div>

</div>
       
       
        </>);
};

export default Review;