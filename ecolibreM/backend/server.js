// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a EcoLibreM Backend');
});

// Ruta para obtener datos financieros
app.get('/api/finanzas', async (req, res) => {
    const { symbol } = req.query;
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

    if (!symbol) {
        return res.status(400).json({ error: 'Se requiere el parámetro "symbol"' });
    }

    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                apikey: API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos financieros' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});