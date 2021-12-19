{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import Stock from "./components/Stock";
import React,{useEffect,useState} from "react";

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_STOCK_INFO": 
       return {...state, ...action.payload}
    case "SET_SEARCH_INPUT": 
       return {...state, ...action.payload}
   case "SET_VACCINED_COUNT": 
       return {...state, ...action.payload}
   case "SET_LOADING": 
       return {...state, ...action.payload}
    default:
       return state
 }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    currentDate: new Date(),
    stockInfo: [[]],
    searchInput: '',
    searchOutput:[[]],
    watchList:[[]],
    searchActive:false,
    query:'',
    loading: true
  });

  useEffect(() => {
    fetch('./data/data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      }
      )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        dispatch({type: 'SET_STOCK_INFO', payload: {stockInfo : myJson}})
      });
      dispatch({type: 'SET_LOADING', payload: {loading : false}})
  },[])

  const handleInputChange = (event) => {
    const query = event.target.value;
    dispatch({type: 'SET_SEARCH_INPUT', payload: {searchInput : query}})
    if(query && query.length){
      dispatch({type: 'SET_SEARCH_INPUT', payload: {searchActive : true}})
      if(query.length > state.query.length){
        dispatch({type: 'SET_SEARCH_INPUT', payload: {searchOutput : 
        state.stockInfo.filter(i => {return i[0].includes(query.toUpperCase())})}})
      }
      dispatch({type: 'SET_SEARCH_INPUT', payload: {query}})
    }else{
      dispatch({type: 'SET_SEARCH_INPUT', payload: {query:''}})
      dispatch({type: 'SET_SEARCH_INPUT', payload: {searchActive : false}})
      dispatch({type: 'SET_SEARCH_INPUT', payload: {searchOutput : [[]]}})
    }
    console.log(state.searchOutput.length)
  };

  const addToWatch = (stock) => {
    if(!stock[3]){
      var stockIndex = state.stockInfo.findIndex(i => {return i[0] === stock[0]})
      var tempStockInfo = state.stockInfo
      stock.push(true)
      tempStockInfo[stockIndex] = stock
      dispatch({type: 'SET_SEARCH_INPUT', payload: {stockInfo : tempStockInfo}})
      
    console.log(stock)
    }else{
      var stockIndex = state.stockInfo.findIndex(i => {return i[0] === stock[0]})
      var tempStockInfo = state.stockInfo
      stock.pop(true)
      tempStockInfo[stockIndex] = stock
      dispatch({type: 'SET_SEARCH_INPUT', payload: {stockInfo : tempStockInfo}})
      
    console.log(stock)
    }
  }

  const result = state.loading?(
    <p>Loading</p>
    ):(
      <>
        <div style={{marginTop:"100px"}}>
          <input placeholder="Search stocks..." style={{padding:'15px',fontSize:30}} type="text" onChange={handleInputChange} value={state.searchInput}></input>
            {state.searchOutput?state.searchOutput.map((stockInfo,index)=>{
              return <Stock data={stockInfo} key={index} addToWatch={addToWatch}/>
            }):null}
            <div style={{marginTop:'100px'}}>
            {!state.searchActive?state.stockInfo.map((stockInfo,index)=>{
              return stockInfo[3]?<Stock data={stockInfo} addToWatch={addToWatch} key={index}/>:null
            }):null}
          </div>
        </div>
      </>
    );

  return (
    <div className="App">
      {result}
    </div>
  );
}
