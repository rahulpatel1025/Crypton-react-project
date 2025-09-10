import React, { useContext, useEffect, useState } from 'react'
import '../css/Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext';
import LineChart from '../components/LineChart';

const Coin = () => {
const {coinId} = useParams();
const [coinData, setCoinData]= useState();
const [historicalData, setHistoricalData]=useState();
const {currency}= useContext(CoinContext);

const fetchCoinData = async ()=>{
  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(res => res.json())
  .then(res => {
    setCoinData(res);
  })
  .catch(err => console.error(err));
}  

const fetchHistoricalData = async ()=>{
  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
  .then(res => res.json())
  .then(res => setHistoricalData(res))
  .catch(err => console.error(err));
}

useEffect(()=>{
  fetchCoinData();
  fetchHistoricalData();
},[currency])
if(coinData, historicalData){
   return (
    <div className='coin'>
     <div className="coin-name">
      <img src={coinData.image.large} alt="img" />
      <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
     </div>
     <div className="coin-chart">
      <LineChart historicalData={historicalData}/>
     </div>
       {/* Coin Info in cards */}
        <div className="coin-info">
          <div className="info-card">
            <span className="label">Crypto Market Rank</span>
            <span className="value">{coinData.market_cap_rank}</span>
          </div>

          <div className="info-card highlight">
            <span className="label">Current Price</span>
            <span className="value">
              {currency.symbol}{' '}
              {coinData.market_data.current_price[currency.name].toLocaleString()}
            </span>
          </div>

          <div className="info-card">
            <span className="label">Market Cap</span>
            <span className="value">
              {currency.symbol}{' '}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </span>
          </div>

          <div className="info-card">
            <span className="label">24h High</span>
            <span className="value green">
              {currency.symbol}{' '}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </span>
          </div>

          <div className="info-card">
            <span className="label">24h Low</span>
            <span className="value red">
              {currency.symbol}{' '}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
} else{
  return(
    <div className="spinner">
    <div className="spin"></div>
    </div>
  )
}
}

export default Coin