import { useState } from 'react'
import './App.css'
import RubiksCubeComponent from './rubiksCube'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RubiksCubeComponent/>
    </>
  )
}

export default App
