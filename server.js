const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const port = process.env.PORT || 80;
const app = express();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
    console.log('Server is up!');
});