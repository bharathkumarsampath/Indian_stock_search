import React, { useState } from "react";
import ArrowDropUpIcon from './Images/stockup.png';
import ArrowDropDownIcon from  './Images/stockdown.png';
import Add from  './Images/add.jpg';
import Delete from  './Images/delete.jpg';

export default function ({data,editWatchList}) {
  
  const [actionVisibility, setActionVisibility] = useState('hidden');
  const [backgroundColor,setBackgroundColor] = useState('#ffffff')

  const [stockName, priceOld,priceNew,inWatchList] = data.length?data:['Unknown',0,0,false]
  const stockEditedName = stockName.substr(0,stockName.length - 5)
  const stockPriceRounded = priceNew && priceNew.toFixed(2)
  const stockExchangeName = stockName.substr(stockName.length - 3)
  const percentageChange = (((priceOld-priceNew)/priceOld)*100).toFixed(2)+'%'
  const stockColor = priceOld < priceNew ? "#e45c4c":"#14d0bf"
  const arrow = priceOld < priceNew ? ArrowDropDownIcon : ArrowDropUpIcon

  const style = {
    root:{
      display:'flex',
      justifyContent:"space-between",
      width:'400px',
      marginBottom:'-25px',
      borderTop:"1px solid",
      borderTopColor:"rgb(235,229,229,0.86)",
      paddingTop:"10px"
    },
    stockName:{
      color:stockColor,
      fontWeight:600,
      marginTop:"100px",
      fontSize:20,
      marginBottom:'-25px'
    },
    stockPrice:{
      color:stockColor,
      fontWeight:600,
      marginTop:"100px",
      fontSize:20,
      marginBottom:'-25px'
    },
    extraneous:{
      display:'flex',
      justifyContent:"space-between",
      width:'400px',
      paddingTop:'34px'
    },
    stockExchange:{
      color:"#afafaf",
      backgroundColor:'#f1f1f1',
      padding:'5px',
      width:'37px',
      borderRadius:"4px"
    },
    action:{
      cursor:'pointer',
      visibility:actionVisibility
    },
    actionButton:{
      marginBottom:'-5px'
    },
    percentage:{
      color:'black'
    }
  }

  return data.length?(
      <div style={{backgroundColor}} 
             onMouseEnter={e => {
               setActionVisibility('visible');
               setBackgroundColor('#f1f1f1');}}
             onMouseLeave={e => {
               setActionVisibility('hidden');
               setBackgroundColor('#ffffff');}}>
        <div style={style.root}>
          <span>
            <text style={style.stockName}>{stockEditedName }</text>
          </span>
          <span>
            <text style={style.stockPrice}> {stockPriceRounded}</text>
          </span>
        </div>
        <div style={style.extraneous}>
          <span>
            <text style={style.stockExchange}>{stockExchangeName}</text>
          </span>
          <div style={style.action} onClick={()=>{editWatchList(data)}}>{inWatchList?
              <img   style={style.actionButton} src={Delete} alt="Delete Stock"/>:
              <img   style={style.actionButton} src={Add} alt="Add Stock"/>}</div>
          <span>
            <text style={style.percentage}>
              <img   style={style.actionButton} src={arrow} alt="ticker"/>
              {percentageChange}
            </text>
          </span>
        </div>
      </div>
  ):null
  
}
