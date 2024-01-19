const express = require('express');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/zipcode/:zipcode', (req, res) => {
  const { zipcode } = req.params;
  const apiUrl = `http://api.zippopotam.us/us/${zipcode}`;

  const request = http.get(apiUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data);

        // Verifica si la respuesta indica un error y el código postal no fue encontrado
        if (jsonData.error && jsonData.error.includes('not found')) {
          res.status(404).json({ error: 'Código postal no encontrado' });
        } else {
          // Verifica si la respuesta contiene información de la ciudad y el país
          const { places, country } = jsonData;
          const city = places && places.length > 0 ? places[0]['place name'] : null;

          if (city && country) {
            res.json({ ciudad: city, país: country });
          } else {
            res.status(404).json({ error: 'Código postal no encontrado' });
          }
        }
      } catch (error) {
        //Devolver un estado 500 en caso de error interno
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  });

  //Manejo de errores para la solicitud HTTP
  request.on('error', (error) => {
    //Devolver un estado 500 en caso de error interno
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  request.end();
});

app.listen(PORT, () => {
  console.log(`El servidor está ejecutándose en http://localhost:${PORT}/api/zipcode/`);
});
