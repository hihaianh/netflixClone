// import { useState } from 'react'
import Location from "./components/Location.jsx"
import './App.css'

function App() {
  const [loadingState, setLoadingState] = useState("");

  return (
    <>
      <div className="bg-red-500 h-screen">
        <div>
          <Location />
        </div>
      </div>
    </>
  )
}

export default App
