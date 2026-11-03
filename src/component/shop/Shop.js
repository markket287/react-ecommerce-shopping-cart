import React from "react";
import fakeData from "../../fakeData/";
import {useState, useEffect} from "react" ;
import '../shop/Shop.css'
import Product from "../Produtct/Product";
import Card from "../Card/Card" ;
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";


const Shop = ()=>  {
    const coun10dta =fakeData.slice(0,10) ;
    const [products] =useState(coun10dta) ;
    const [card,setCard]=useState([]);

        useEffect(()=>{
        const dataloadMnage =getDatabaseCart(); //loadata utilities/databaseManager.js
        const keybarkor = Object.keys(dataloadMnage);   //keybarkor = product key bar kora hoise
        const pewvieskey =keybarkor.map( pdkey =>{
        const productFind = fakeData.find(find => find.key === pdkey);
        productFind.quantity = dataloadMnage[pdkey];
        return productFind ;
        })
      setCard(pewvieskey)

    },[])



const handlrcluker = (products)=> {
    const tobeadded =products.key ;
    const sameProdu = card.find(pd => pd.key === tobeadded);
    let count = 1 ; 
    let newCard ;
    if(sameProdu){
        count =sameProdu.quantity + 1;
        sameProdu.quantity =count ;
        const ohter = card.filter(pd => pd.key !== tobeadded);
        newCard =[...ohter , sameProdu];
    }
    else{
        products.quantity = 1 ;
        newCard =[...card , products]
    }
    setCard(newCard);
    addToDatabaseCart(products.key, count);  
}

return(
    <div className ='shop-cointerner'>
        <div className="produts-cointernar">
         {
          products.map(pd => (
                <Product
                    key={pd.key}
                    showAddToCrad={true}
                    handlrcluker={handlrcluker}
                    products={pd}
                />
                ))
         }
        </div>
        
        <div className="card-cointenar">

            <Card card={card}>      {/* child sivabey link add */}
                     <Link to="/Review"><button className='main-button' style={{padding:"10px",backgroundColor:"goldenrod"}}> Review Card</button></Link>
            </Card>  
                 
        </div>
    </div>

)

}

export default Shop ;