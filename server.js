import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send(`hello ${process.env.NAME}!`);
})


app.listen(3000, () => {
    console.log('[PORT 3000] Server is running');
})