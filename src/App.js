import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [choose, setChoose] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = (e) => {
    e.preventDefault();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      console.log(res);
      setChoose(true);
      setInfo({
        name,
        species: res.data.species.name,
        img: res.data.sprites.other.dream_world.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        type: res.data.types[0].type.name,
        weight: res.data.weight,
      });
    });
    setName("");
  };

  //runs only once when the page is refreshed

  return (
    <div className="App">
      <div className="title">
        <h1>
          POKE <span>STATS</span>
        </h1>
        
          <input
            placeholder="Enter the POKEMON"
            value={name}
            onChange={(e) =>
              setName((name) => {
                const newName = e.target.value;
                return newName.toLowerCase();
              })
            }
            type="text"
          />
          <button onClick={searchPokemon}>Search Pokemon</button>
        
      </div>
      <div className="display">
        {choose === false ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
            <h1>{info.name}</h1>
            <img src={info.img} alt="" />
            <h3>SPECIES: {info.species}</h3>
            <h3>Type: {info.type}</h3>
            <h4>Hp: {info.hp}</h4>
            <h4>Weight: {info.weight}</h4>
            <h4>Attack: {info.attack}</h4>
            <h4>Defense: {info.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
