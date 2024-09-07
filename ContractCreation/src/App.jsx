import { useState } from 'react'
import './App.css'
import ContractCreation from './components/ContractCreation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ContractCreation/>
    </>
  )
}

export default App
