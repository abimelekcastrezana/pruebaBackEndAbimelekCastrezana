# pruebaBackEndAbimelekCastrezana
Prueba Técnica para Back End: Devolver a partir de un código postal, ciudad y país en un JSON.

# COMO UTILIZAR ESTE REPOSITORIO

1 instalar con "npm i" o "npm install", desde la terminal.
2 usa el comando "npm run dev" para inicializar un servidor de Express, va a abrirse en el puerto 3000(también puedes inicalizar con "npm run start")

3 Abrir el navegador y cambiar el codigo postal
    
    Ejemplo: 

    Ingresar a la derecha de .zipcode/ un códgio postal como este "90210".

    así luce en la barra de busqueda del navegador "http://localhost:3000/api/zipcode/90210"

    Resultado: 
    {
        "ciudad": "Beverly Hills",
        "país": "United States"
    }

Juega con codigos postales validos, en caso de no ser valido te avisa.

Ejemplo: 00000 

Resultado:
    {
        "error": "Código postal no encontrado"
    }

4 Para correr las pruebas utiliza el comando "npm run test", si no funciona correctamente avisa que sucedió y es más fácil arreglarlo.

Espero haya sido de agrado la experiencia de usar este repo. 

## Mejoras

- Una interfaz bonita y que el usuario pueda ingresar el codigo postal en una cajita que capture el numero que desee.
- Tal vez hacerlo un juego donde hagan adivinanzas sobre codigos postales, ciudades y paises, con operaciones o alguna cosa.
- Implementarlo con TypeScript que es un lenguaje fuertemente tipado y mucho más claro ver problemas a la hora de desarrollar. 

## POSTDATA
Tengo muchas ganas de trabajar con ustedes IselaMorquecho y aobregonmx, les dejo mi correo para que se contacten conmigo "abimelekcastrezana@gmail.com". 