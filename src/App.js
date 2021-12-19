import "./styles.css";
import Stock from "./components/Stock";
import React,{useEffect} from "react";

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_STATE": 
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
    query:'',
    loading: true
  });

  useEffect(() => {
    fetch('./data/data.json',{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
      }).then(function(response){
        return response.json();
      }).then(function(myJson) {
        dispatch({type: 'SET_STATE', payload: {stockInfo : myJson}})
      });
      dispatch({type: 'SET_STATE', payload: {loading : false}})
  },[])

  const handleInputChange = (event) => {
    const query = event.target.value.toUpperCase();
    dispatch({type: 'SET_STATE', payload: {searchInput : query}})
    if(query && query.length){
      if(query.length > state.query.length){
        dispatch({type: 'SET_STATE', payload: {searchOutput : 
        state.stockInfo.filter(i => {return i[0].includes(query)})}})
      }
      dispatch({type: 'SET_STATE', payload: {query}})
    }else{
      dispatch({type: 'SET_STATE', payload: {query:''}})
      dispatch({type: 'SET_STATE', payload: {searchOutput : [[]]}})
    }
  };

  const editWatchList = (stock) => {
    var stockIndex = state.stockInfo.findIndex(i => {return i[0] === stock[0]})
    var tempStockInfo = state.stockInfo
    if(!stock[3]){
      stock.push(true)
    }else{
      stock.pop(true)
    }
    tempStockInfo[stockIndex] = stock
    dispatch({type: 'SET_STATE', payload: {stockInfo : tempStockInfo}})
  }

  const style = {
    spacing:{
      marginTop:"100px"
    },
    search:{
      padding:'15px',
      fontSize:30
    }
  }

  const result = state.loading?(<p>Loading</p>):
                  (<div style={style.spacing}>
                      <input placeholder="Search stocks..." 
                          style={style.search} 
                          type="text" 
                          onChange={handleInputChange} 
                          value={state.searchInput}></input>
                      {state.searchOutput?state.searchOutput.map((stockInfo,index)=>{
                        return <Stock data={stockInfo} key={index} editWatchList={editWatchList}/>
                      }):null}
                      <div style={style.spacing}>
                        {!state.searchActive?state.stockInfo.map((stockInfo,index)=>{
                          return (stockInfo[3]?<Stock data={stockInfo} editWatchList={editWatchList} key={index}/>:null)
                        }):null}
                      </div>
                    </div>
                  )

  return (
    <div className="App">
      {result}
    </div>
  );
}
