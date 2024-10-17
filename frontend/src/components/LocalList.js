import React, { useEffect, useState } from 'react';
import { fetchLocales } from '../services/api';

const LocalList = () => {
    const [locales, setLocales] = useState([]);

    useEffect(() => {
        const getLocales = async () => {
            const data = await fetchLocales();
            setLocales(data);
        };
        getLocales();
    }, []);

    return(
        <div>
            <h2>Listado de locales Comerciales</h2>
            <ul>
                {locales.map(local =>(
                    <li key={local.id}>
                        <h3> {local.nombre} </h3>
                        <p> {local.direccion} </p>
                        <p> {local.barrio} </p>
                        <p> {local.precio_arrendamiento} </p>
                        <p> {local.descripcion} </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocalList;