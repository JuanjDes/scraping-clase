const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const port = 3000;

const url = 'https://carlosdiazgirol.github.io/dashboard/';

// con este ejemplo de axios nos traemos todo el html de la url indicada
app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200){    // Si el estado de la respuesta es ok
            const html = response.data; // volcamos los datos traidos en const html
            const $ = cheerio.load(html); // $ es una librería muy utilizado en j-query. Aquí lo utilizamos como constante

            // vamos a extraer el título de página
            const pageTitle = $('title').text();

            // cramos array para guardar cada enlace de la web
            const links = [];
            const images = [];

            // utilizamos each de cheerio (es igual que un foreach) para recorrer enlaces y guardarlos en el array
            $('a').each((index, element) => {
                const link = $(element).attr('href'); // link contiene el atributo href del primer elemento a
                links.push(link);  // metemos el primer link en el array. y repetirá con el resto
            });

            // igual que antes, pero para las imágenes
            $('img').each((index, element) => {
                const image = $(element).attr('src'); // image contiene el atributo src del primer elemento img
                images.push(image);  // metemos la primer imagen en el array. y repetirá con el resto
            });

            console.log(links);

            // mostramos datos en navegador
            res.send(`
                // mostramos título de la web
                <h1>${pageTitle}</h1>

                // mostramos los enlaces
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                
                // mostramos las imágenes
                <ul>
                    ${images.map(image => `<li><a href='${url}${image}'>${image}</a></li>`).join('')}
                </ul>
            `);
            
        };
    });
});

app.listen(port, () => {
    console.log(`Server escuchando en puerto ${port}`);
});