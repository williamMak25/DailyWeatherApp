import { CircularProgress } from '@mui/material'
import React from 'react'
import { useEffect,useState } from 'react'
import { useLocation } from './Location'
import './weaher.css'

export const Display = () => {
    const [defaultState,setDefaultState] = useState()
    const [countaryName,setCountaryName] = useState('')
    localStorage.setItem('name',countaryName)
    const localData = localStorage.getItem('name')
    const currentLocation = useLocation()
    const [location,setlocation] = useState(false)
    console.log(location)
    
    const handleClick = (e) =>{
        e.preventDefault()
        setlocation(true)

    }
  useEffect(()=>{
    
    if(currentLocation){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ location ? localData : currentLocation}&appid=2f65f53e319e9993b628e1e8e936c4fb`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setDefaultState([data])
          console.log(data)
        })
    }
    },[currentLocation,countaryName,location]);

    if(!defaultState){
        return(
            <div className="">
            <CircularProgress/>
            </div>
        )
    }else{
        return (
    <div className='container my-5 d-flex flex-column align-items-center'>
        
    {defaultState?.map((data) => (
    <div key={data.name} className=''>
            
        <div className='d-flex flex-column justify-content-center align-items-center p-5 m-auto' style={{backgroundImage:'url(https://i.ibb.co/tmtvmdG/12126876-4904726.jpg)',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover'}}>
            

            <div className='d-flex flex-row align-items-center justify-content-between w-100'>

                <div className='p-2 me-5 d-flex flex-column justify-content-start'>
                    <div className='d-flex flex-row'>
                        <span className='mx-4 py-2 rounded-3 bg-primary w-25 text-dark text-center mb-0'>{(data.name).toUpperCase()}</span>
                        <input type='text' value={countaryName} onChange={(e)=>setCountaryName(e.target.value)}  className="form-control w-50"/>   
                        <button onClick={handleClick} className="btn">Search</button>     
                    </div>

                    <div className='d-flex flex-column justify-content-start align-items-start m-4 w-100 bg-white p-2 rounded mt-2 ' id='weather'
                        style={{backgroundImage:'url(https://i.ibb.co/tmtvmdG/12126876-4904726.jpg)',
                        backgroundPosition:'center',
                        ackgroundRepeat:'no-repeat',
                        backgroundSize:'560px 250px'}}>

                        <div className='mx-3'>
                            <p><i className="bi bi-cloud"></i> Weather</p>

                            <small className='m-0'>What's the weather</small>
                            <h4 className='m-0'>{(data.main.temp - 273).toFixed(2)} &deg;C</h4>
                            <p>{data.weather[0].description}</p>
                        </div>

                        <div className='d-flex flex-row justify-content-between w-100 my-3'>
                            <div className='bg-warning rounded-4 text-center px-4 '>
                                <p className='m-0'>Humidity</p>
                                <h4 className='m-0'>{data.main.humidity}%</h4>
                            </div>
                            <div className='bg-white rounded-4 text-center px-4 '>
                                <p className='m-0'>Feel Like</p>
                                <h4 className='m-0'>{(data.main.feels_like - 273).toFixed(2)} &deg;C</h4>
                            </div>
                            <div className='bg-dark text-white rounded-4 text-center px-4 '>
                                <p className='m-0'>Pressure</p>
                                <h4>{data.main.pressure} hPa</h4>       
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column align-items-start p-3 rounded' 
                    style={{backgroundImage:'url(https://i.ibb.co/YZndvyh/6362773-2244.jpg)',
                    backgroundPosition:'center',
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover'}}>

                    <p><i className="bi bi-wind"></i> Wind</p>    
                    <div className='my-5 p-0'>
                        <p className='m-0'>How windy today</p>
                        <h4 className='m-0'>{data.wind.speed} mph</h4>
                        <p>{data.wind.deg}  &deg; <i class="bi bi-send"></i></p>
                    </div>
                    <div className='d-flex flex-row '>
                        <div className='text-white mx-4 text-center bg-secondary px-2 rounded-3'>
                            <h6 className='m-0'>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</h6>
                            <p className='m-0'><i className="bi bi-brightness-alt-high"></i> sunrise</p>
                        </div>
                        <div className='text-white text-center mx-3 bg-secondary px-2 rounded-3'>  
                            <h6 className='m-0'>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</h6>
                            <p className='m-0'><i className="bi bi-brightness-alt-high-fill"></i> sunset</p>
                        </div>
                    </div>     
                </div>
            </div> 

            <div className='w-100 rounded-4 bg-prmary p-0 text-white px-2 d-flex flex-column'
            style={{backgroundImage:'url(https://i.ibb.co/Jx2dVJd/10385782-3706.jpg)',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'}}>

                    <h6 className=' w-25 p-2 my-0'>Region -  {data.sys.country}</h6>
                    <img src={`https://flagsapi.com/${data.sys.country}/flat/64.png`} className='flag my-0'/>
                    <p className=' my-0'>Temperature - ( max: {(data.main.temp_max - 273).toFixed(2)}  &deg;C  - min: {(data.main.temp_min - 273).toFixed(2)}  &deg;C )</p>
                    
            </div>

        </div>
    </div>))}
          </div>)}
}
