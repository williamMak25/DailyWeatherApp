import React, { useEffect, useState,useContext, useCallback} from 'react'

export function useLocation(){
    return useContext(LocationContext)
 }
const LocationContext = React.createContext('')

export const LocationProvider = ({children}) => {

const [currentLocation,setCurrentLocation] = useState('');
const url = 'https://ipinfo.io/json?token=54960abe091942';
    
    useEffect(()=>{
        fetch(url)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
           //console.log(data.region)
            setCurrentLocation(data.city)
        })
    },[currentLocation])

  return (
    <LocationContext.Provider value={currentLocation}>
        {children}
    </LocationContext.Provider>
  )
}
