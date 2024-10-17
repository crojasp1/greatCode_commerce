import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchLocales = async () => {
    try{
        const response = await axios.get(`${API_URL}/locales`);
        return response.data;
    }catch(error){
        console.error('Error al optener los datos de los locales comerciales', error);
    }
};