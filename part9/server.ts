import express = require('express');
import http = require('http');

const app = express();

const server = http.createServer(app);

app.get('/hello', (req, res) => {
    res.send('Hello Full Stack!');
})

const PORT: number = 3000;
server.listen(PORT, () => console.log(`server listening at ${PORT}`));



