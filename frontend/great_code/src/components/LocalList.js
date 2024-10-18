import React from "react";

//Componente para mostrar la lista de locales
const LocalList = ({locals}) => {
    if(locals.length === 0) {
        return <p className="text-center">No se encontraron locales.</p>;
    }

    return(
        <div className="row">
            {locals.map((local) => (
                <div key = {local.id} className="col-md-4 mb-3"> {/*Distribuye tarjetas en columnas de bootstrap*/}
                    <div className="card">
                        <div className="card-body">
                            <img>{local.name}</img>
                            <p className="card-text"><strong>Agencia:</strong> {local.agency}</p>
                            <p><strong>Código:</strong> {local.id}</p>
                            <p><strong>Tamaño:</strong> {local.size}</p>
                            <p><strong>Dirección:</strong> {local.location}</p>
                            <p><strong>Precio Arriendo:</strong> {local.price}</p>
                            <p><strong>Click aquí:</strong> {local.link}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocalList;