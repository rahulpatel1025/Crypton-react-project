import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
const LineChart = ({historicalData}) => {
    const [data, setData]= useState([['Date', 'Price']])
useEffect(()=>{
    let dataCopy =[['Date', 'Price']];
    if(historicalData.prices){
        historicalData.prices.map((item)=>{
            dataCopy.push([`${new Date(item[0]).toLocaleString().slice(0,-5)}`,item[1]])
        })
        setData(dataCopy);
}
},[historicalData])
 const options = {
    backgroundColor: '#1b1b29',
    chartArea: { width: '85%', height: '70%' },
    colors: ['#00d4ff'],
    hAxis: {
      textStyle: { color: '#bbb' },
      gridlines: { color: '#333' },
    },
    vAxis: {
      textStyle: { color: '#bbb' },
      gridlines: { color: '#333' },
    },
    legend: {
      position: 'bottom',
      textStyle: { color: '#fff' },
    },
    tooltip: {
      textStyle: { color: '#000' },
      showColorCode: true,
    },
  }
  return (
    <Chart
         chartType='LineChart'
         data={(data)}
         options={options}
         height='100%'
         legendToggle/>
    
  )
}

export default LineChart