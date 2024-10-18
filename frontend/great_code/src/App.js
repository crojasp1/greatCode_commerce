import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar.js';
import LocalList from './components/LocalList';

const App = () => {
  const [locals, setLocals] = useState ([]); //Almacena lista de locales
  const [loading, setLoading] = useState (false); //Estado para gestionar el estado de carga de búsqueda

  //Función para manejar la búsqueda de locales por barrio
  const handleSearch = async (barrio) => {
    setLoading(true); //Esyado de carga a true
    try {
      const response = await fetch (`https://api-backend.com/locals?barrio=${barrio}`); //LLamada a API con el barrio
      const data = await response.json();
      setLocals(data); //Almacena los locales obtenidos
    } catch (error) {
      console.error("Error fetching locals:", error);
    }
    setLoading(false);
  };

  return(
    <div className="container mt-5">
      <h1 className="text-center mb-4">Buscar Locales Comerciales por Barrio</h1>
      <SearchBar onSearch={handleSearch}/> {/*Componente de barra de búsqueda*/}
      {loading ? <p className="text-center">Cargando...</p> : <LocalList locals = {locals}/>} {/*Muestra mensaje de carga o locales*/}
    </div>
  );
};


export default App;
