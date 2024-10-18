import React, {useState} from "react";

const SearchBar = ({onSearch}) => {
    const [barrio, setBarrio] = useState(''); //Almacena barrio que ingresa el usuario

    //Maneja el envío del formulario de búsqueda
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(barrio);
    };

    return(
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={barrio}
                    onChange={(e) => setBarrio(e.target.value)}
                    placeholder="Ingresa el barrio"
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button> {/*Botón de búsqueda*/}
                </div> 
            </div>
        </form>
    );
};

export default SearchBar;