import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import "../css/NavBar.css"; 
import { Link } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
const NavBar = () => {
  const{setCurrency} = useContext(CoinContext)
  
const symbols = {
  usd: "$",
  inr: "₹",
  eur: "€",
};

const currencyHandler = (event) => {
  const value = event.target.value;
  setCurrency({ name: value, symbol: symbols[value] || "$" });
};


  return (
    <div className='navbar'>
      <div className="nav-left">
        <Link to={'/'}>
        <img src={assets.logo} alt="logo" className="logo" />
        <h1 className="brand-name">Crypton</h1>
     </Link> </div>
      
      <ul className="nav-links">
        <Link to={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <button>Sign up</button>
      </div>
    </div>
  )
}

export default NavBar;
