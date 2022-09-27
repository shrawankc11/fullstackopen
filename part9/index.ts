import express = require('express');
import http = require('http');
import { bmiCalculator } from './bmiCalculator';

const app = express();
app.use(express.json())

const server = http.createServer(app);

app.get('/hello', (_req, res): object => {
    return res.send('Hello Full Stack!');
})

app.post('/bmi', (req, res) => {
    const { height, weight }: any = req.query;
    try {
        const result: string = bmiCalculator(height, weight);
        res.send({ message: result });
        return;
    } catch (err) {
        console.log(err.message)
        res.send({
            error: 'malformatted parameters'
        })
    }
})

const PORT: number = 3000;
server.listen(PORT, () => console.log(`server listening at ${PORT}`));