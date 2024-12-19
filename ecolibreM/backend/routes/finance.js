// backend/routes/finance.js

const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Base URL de la API financiera (ejemplo: Alpha Vantage)
const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.EW2GV1Y2IUUDSHAR;

// Ruta para obtener cotizaciones en tiempo real
router.get('/quote', async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: 'Se requiere el parámetro "symbol"' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: symbol,
                apikey: API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la cotización en tiempo real' });
    }
});

// Ruta para obtener datos intradía
router.get('/intraday', async (req, res) => {
    const { symbol, interval = '5min' } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: 'Se requiere el parámetro "symbol"' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: interval,
                apikey: API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos intradía' });
    }
});

// Ruta para obtener datos diarios
router.get('/daily', async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: 'Se requiere el parámetro "symbol"' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                apikey: API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos diarios' });
    }
});

// Ruta para buscar tickers
router.get('/search', async (req, res) => {
    const { keywords } = req.query;

    if (!keywords) {
        return res.status(400).json({ error: 'Se requiere el parámetro "keywords"' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'SYMBOL_SEARCH',
                keywords: keywords,
                apikey: API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar tickers' });
    }
});

// Ruta para obtener la descripción de la empresa (usando Finnhub o similar)
router.get('/company-overview', async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: 'Se requiere el parámetro "symbol"' });
    }

    try {
        // Ejemplo con Finnhub
        const FINNHUB_URL = 'https://finnhub.io/api/v1/stock/profile2';
        const FINNHUB_API_KEY = process.env.cti4tg9r01qm6mum4eugcti4tg9r01qm6mum4ev0;

        const response = await axios.get(FINNHUB_URL, {
            params: {
                symbol: symbol,
                token: FINNHUB_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la descripción de la empresa' });
    }
});

module.exports = router;