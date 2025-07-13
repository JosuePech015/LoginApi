const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BANXICO_TOKEN = process.env.BANXICO_TOKEN;

app.use(cors());

app.get('/api/banxico/:serieId', async (req, res) => {
  const serieId = req.params.serieId;
  const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${serieId}/datos/oportuno`;

  try {
    const respuesta = await axios.get(url, {
      headers: { 'Bmx-Token': BANXICO_TOKEN },
    });

    res.json(respuesta.data);
  } catch (error) {
    console.error('Error al consultar Banxico:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de Banxico' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy de Banxico corriendo en http://localhost:${PORT}`);
});
