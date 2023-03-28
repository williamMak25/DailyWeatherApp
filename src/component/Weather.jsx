import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Display } from './display'



export const WeatherInterFace = () => { 

    const [weatherData,setWeatherData] = useState([])
    const [countaryName,setCountaryName] = useState('')
    const [clicked,setClicked] = useState(false)
    console.log(weatherData)
    
        const handleClick = () =>{
             fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countaryName}&appid=2f65f53e319e9993b628e1e8e936c4fb`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                setWeatherData([data])
              //console.log(weatherData)
                setClicked(true)
            })
        }
            return (
            <>
        <div className='' >

            <div className=''>
                <input type='text' value={countaryName} onChange={(e)=>setCountaryName(e.target.value)}  className=""/>   
                <button onClick={handleClick} className="">Search</button>
            </div>
            {!clicked ? <Display/> :(<>
           {weatherData?.map((data) => (
            <div key={data.name} className=''>
                <h2 className=''>{data.name}</h2>
                <div className=''>   
                    <div className=''>
                        <h3>Humidity</h3>
                        <p>{data.main.humidity}%</p>
                    </div>
    
                    <div className=''>
                        <h3>Pressure</h3>
                        <p>{data.main.pressure} hPa</p>
                    </div>
    
                    <div className=''>
                        <h4>Temperature<i className="bi bi-thermometer"></i></h4>
                        <p>{(data.main.temp - 273).toFixed(2)} &deg;C</p>
                        <span>( max: {(data.main.temp_max - 273).toFixed(2)}  &deg;C </span> - <span>min: {(data.main.temp_min - 273).toFixed(2)}  &deg;C )</span>
                    </div>
    
                    <div className=''>
                        <h4>{data.weather[0].main} <i className="bi bi-cloud"></i></h4>
                        <p>{data.weather[0].description}</p>
                       
                    </div>
    
                    <div className=''>
                        <h4>Wind <i className="bi bi-wind"></i></h4>
                        <p>{data.wind.deg}  &deg;</p>
                        <p>{data.wind.speed} mph</p>
                    </div>
    
                    <div className=''>
                        <h4 className=''>Region -  {data.sys.country}</h4>
                        <div className=''>
                            <img src={`https://flagsapi.com/${data.sys.country}/flat/64.png`} alt='countary' className=''/>
                        </div> 
                    </div>
             </div>
            </div>
            ))}</>)}
     </div>
     </>
      )
    }