
import './App.css'
import { Display } from './component/display'

import { LocationProvider } from './component/Location'
import { WeatherInterFace } from './component/Weather'

function App() {

  return (
    <div className="App">
    <LocationProvider>
      <Display/>
    </LocationProvider>
    </div>
  )
}

export default App
