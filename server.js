import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page1.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page2.html'));
});

app.use((req, res) => {
    res.status(404).send(`404 ERROR: You have found CSE 340, but the ${req.url} page does not exist`)
});


app.listen(3000, () => {
    console.log('[PORT 3000] Server is running');
})