import express from 'express';
import http = require('http');
// import { bmiCalculator } from './bmiCalculator';
import { calculateExercise, parseArgs } from './exerciseCalculator';

const app = express();
app.use(express.json());

const server = http.createServer(app);

app.get('/hello', (_req, res): object => {
    return res.send('Hello Full Stack!');
});

// app.get('/bmi', (req, res) => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const { height, weight } = req.query;
//     try {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//         const result: string = bmiCalculator(height, weight);
//         res.send({ message: result });
//         return;
//     } catch (err: unknown) {
//         console.log(err.message);
//         res.send({
//             error: 'malformatted parameters'
//         });
//     }
// });

app.post('/exercise', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.json({
            error: 'parameter missing'
        });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parseArgs(daily_exercises);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercise(daily_exercises, target);
        return res.json({
            message: result
        });
    } catch (err) {
        return res.send({
            error: "malformatted parameters"
        });
    }


});

/*app.post('/calculate', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { val1, val2, op }: any = req.body;

    if (!val1 || isNaN(Number(val1))) {
        return res.status(400).send({ error: "Provide both values as numbers." });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(val1), Number(val2), op);
    res.send(result);
});*/

const PORT = 3000;
server.listen(PORT, () => console.log(`server listening at ${PORT}`));