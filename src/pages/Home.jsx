import React, { useContext, useEffect, useState } from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext'
const Home = () => {
const {allCoin, currency}= useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState('');

const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ''){
        setDisplayCoin(allCoin);
    }
}

const searchHandler = async(event)=>{
    event.preventDefault();
    const coins = await allCoin.filter((item)=>{
        return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
}

useEffect(()=>{
    setDisplayCoin(allCoin);
},[allCoin])

  return (
    <div className='Home'>
        <div className="hero">
            <h1>Crypton<br/>Crypto Marketplace</h1>
            <p>Welcome to Crypton, a cryptocurrency marketplace. Sign up to get further info on Crypto</p>
            <form onSubmit={searchHandler}>
                <input onChange={inputHandler} list='coinlist'value={input} type="text" placeholder='Search Crypto Stocks....' required/>
                <datalist id='coinlist'>
                    {allCoin.map((item,index)=>(
                        <option key={index} value={item.name}/>
                    ))}
                </datalist>
                <button type ="submit">Search</button>
            </form>
        </div>
        <div className="cryptoTable">
            <div className="tableLayout">
                <p>#</p>
                <p>Coin</p>
                <p>Price</p>
                <p style={{textAlign:'center'}}>24hr Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className="tablelayout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="logo" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0? 'green': 'red'}> 
                           {item.price_change_percentage_24h > 0 
    ? `+${item.price_change_percentage_24h.toFixed(2)}%` 
    : `${item.price_change_percentage_24h.toFixed(2)}%`}</p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Home