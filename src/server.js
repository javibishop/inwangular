
const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/usuarios', (req, res) => {
    let usuarios = {nombre:'juan', apellido:'pepa'};
    res.send(usuarios);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

