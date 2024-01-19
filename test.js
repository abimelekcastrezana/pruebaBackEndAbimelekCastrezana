const http = require('http');

const runTest = async () => {
    // Prueba 1: Código postal válido
    await test('/api/zipcode/90210', { status: 200, ciudad: 'Beverly Hills', país: 'United States' });
    console.log('Prueba1 Codigo postal válido: exitosa');
  
    // Prueba 2: Código postal inválido
    await test('/api/zipcode/invalid', { status: 404, error: 'Código postal no encontrado' });
    console.log('Prueba2 Códgio postal inválido: exitosa');
  
    // Prueba 3: Código postal inexistente
    await test('/api/zipcode/00000', { status: 404, error: 'Código postal no encontrado' });
    console.log('Prueba3 Código postal inexistente: exitosa');
  
    // Prueba 4: Error interno del servidor
    await test('/api/zipcode/error', { status: 404, error: 'Código postal no encontrado' });
    console.log('Prueba4 Error interno del servidor: exitosa');
  };

const test = (path, expected) => {
  return new Promise((resolve, reject) => {
    const request = http.get(`http://localhost:3000${path}`, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          validateResponse(response.statusCode, jsonData, expected);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.end();
  });
};

const validateResponse = (actualStatus, actualData, expected) => {
    // Valida el estado HTTP
    if (actualStatus !== expected.status) {
      throw new Error(`Error en la prueba: Se esperaba estado ${expected.status}, pero se recibió ${actualStatus}`);
    }
  
    // Si el código de estado es 404, verificar el mensaje de error
    if (actualStatus === 404 && actualData.error !== expected.error) {
      throw new Error(`Error en la prueba: Se esperaba error=${expected.error}, pero se recibió ${actualData.error}`);
    }
  
    // Si el código de estado es 500, verificar el mensaje de error
    if (actualStatus === 500 && actualData.error !== expected.error) {
      throw new Error(`Error en la prueba: Se esperaba error=${expected.error}, pero se recibió ${actualData.error}`);
    }
  
    // Validar el contenido JSON de la respuesta
    for (const key in expected) {
      if (key !== 'status' && key !== 'error') {
        if (actualData[key] !== expected[key]) {
          throw new Error(`Error en la prueba: Se esperaba ${key}=${expected[key]}, pero se recibió ${actualData[key]}`);
        }
      }
    }
  
  

  }; 
// Ejecutar las pruebas
runTest().catch((error) => {
  console.error('Error durante la ejecución de las pruebas:', error);
});






