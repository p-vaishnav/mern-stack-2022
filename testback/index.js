const express = require('express');

const app = express();

const PORT = 8000;

app.get('/login', (req, res) => {
    return res.send('login route');
});

app.get('/', (req, res) => {
    return res.send('Home page...');
});

app.get('/logout', (req, res) => {
    return res.send('logout route');
});

app.listen(PORT, () => {
    console.log('Server is up and running...');
});