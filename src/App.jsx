import { useState } from 'react'
import MoviesList from './MoviesList';

function App() {

  const [text, setText] = useState("start");
  const handleInput = (e) => {
    setText(e.target.value)
    console.log(text);

  }
  return (
    <>
      <MoviesList/>
      
    </>
  )
}

export default App
