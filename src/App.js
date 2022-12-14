import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import './style.css'

import api from "./services/api"


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

 async function handleSearch(){
    if(input === ''){
      alert("Fill the blank")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch {
      alert("Something went wrong try again")
      setInput("")     
    }
  }

  return (
    <div className="container">
      <h1 className="title">ZIP CODE</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Type your Zip Code..."
        value={input}
        onChange={ (e) => setInput(e.target.value) }

        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
           <main className="main">
           <h2>ZIP: {cep.cep}</h2>
           
           <span>{cep.logradouro}</span>
           <span>Complement: {cep.complemento}</span>
           <span>{cep.bairro}</span>
           <span> {cep.localidade} - {cep.uf}</span>
         </main>
   
      )}
   
    </div>
  );
}

export default App;
