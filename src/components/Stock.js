import React, { useState } from "react";
import ArrowDropUpIcon from './Images/stockup.png';
import ArrowDropDownIcon from  './Images/stockdown.png';
import Add from  './Images/add.jpg';
import Delete from  './Images/delete.jpg';

export default function ({data,addToWatch}) {
  const stockColor = data[1] < data[2] ? "#e45c4c":"#14d0bf"
  const arrow = data[1] < data[2] ? ArrowDropDownIcon : ArrowDropUpIcon
  const [style, setStyle] = useState('hidden');
  const [backgroundColor,setBackgroundCOlor] = useState('#ffffff')

  return data.length?(
        <div style={{backgroundColor:backgroundColor}} onMouseEnter={e => {
          setStyle('visible');setBackgroundCOlor('#f1f1f1')}}
          onMouseLeave={e => {
            setStyle( 'hidden');setBackgroundCOlor('#ffffff')
        }}>
        <div style={{display:'flex',justifyContent:"space-between",width:'400px',marginBottom:'-25px',borderTop:"1px solid",
                 borderTopColor:"rgb(235,229,229,0.86)", paddingTop:"10px"}}
                 >
          <span>
            <text style={{color:stockColor,fontWeight:600,marginTop:"100px",fontSize:20,marginBottom:'-25px'}}>{ data[0].substr(0,data[0].length - 5)}</text>
          </span>
          <span>
            <text style={{color:stockColor,fontWeight:600,marginTop:"100px",fontSize:20,marginBottom:'-25px'}}> {data[2] && data[2].toFixed(2)}</text>
          </span>
        </div>
        <div style={{display:'flex',justifyContent:"space-between",width:'400px',paddingTop:'34px'}}
          >
          <span>
            <text style={{color:"#afafaf",backgroundColor:'#f1f1f1',padding:'5px',width:'37px',borderRadius:"4px"}}>{data[0].substr(data[0].length - 3)}</text>
          </span>
          <div style={{cursor:'pointer',visibility:style}} onClick={()=>{addToWatch(data)}}>{data[3]?
              <img   style={{marginBottom:'-5px'}} src={Delete} alt="fireSpot"/>:
              <img   style={{marginBottom:'-5px'}} src={Add} alt="fireSpot"/>}</div>
          <span>
            <text style={{color:"black"}}>
            <img   style={{marginBottom:'-5px'}} src={arrow} alt="fireSpot"/>{(((data[1]-data[2])/data[1])*100).toFixed(2)+'%'}</text>
          </span>
        </div>
        
        </div>
  ):null
  
}
