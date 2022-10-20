import React, { useEffect, useState } from 'react'
// import hotbg from './Components/hot.jpg';
import Weather from './Components/Weather';
import getFormatData from './Components/Fetch';


const App = () => {
const[data,setData]=useState("");
const update=()=>{
  const time=new Date();
  setData(time.toLocaleString());
}
setInterval(update,1000);
  const [weather,setWeather]=useState(null);
  const [unit,setUnits]=useState("metric");
  const [city,setCity]=useState("Rourkela")
  useEffect(()=>{
    const fetch=async()=>
    {
    const data=await getFormatData(city,unit);
    setWeather(data);
    console.log(data);
    }
    fetch();
  },[unit,city])
const handleUnitClick = (e) => {
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1);

  const isCelsius = currentUnit === "C";
  button.innerText = isCelsius ? "°F" : "°C";
  setUnits(isCelsius ? "metric" : "imperial");
};
const enterKeyPressed = (e) => {
  if (e.keyCode === 13) {
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
  }

  }
  return (
    <div className="app">
    <div className='overlay'>
      {
        weather && (
      <div className='container'>
        <div className='section section__inputs'>
        <input id='input'
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />        
                <button onClick={(e)=>handleUnitClick(e)}>°C</button>
        </div>
        <div className='section section__temprature'>
          <div className='icon'>
            <h3>{weather.name}, {weather.country}</h3>
            <img src={weather.iconUrl} alt="weather icon"/>
            <h3>{weather.description}</h3>
          </div>
          <div className='time'>{data}</div>
<div className='temperature'>
  <h1>
    {`${Math.round(weather.temp)} ${unit==='metric' ? '°C' :"°F"}`}
  </h1>
</div>
      </div>
{/* description */}
        <div>
          <Weather weather={weather} unit={unit}/>

                  </div>
      
      </div>)
}
      </div>     
      </div>

  )
}

export default App;
