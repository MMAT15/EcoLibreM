// backend/server.js

const express = require('express');
const cors = require('cors');
const financeRoutes = require('./routes/finance');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/finanzas', financeRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a EcoLibreM Backend');
});

// Iniciar el servidor con manejo de errores
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Por favor, cambia el puerto en el archivo .env.`);
    } else {
        console.error(err);
    }
});