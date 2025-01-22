import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome!</h1>';
    res.render('index', {title, content});
});

app.get('/about', (req, res) => {
    const title = 'About';
    const content = '<h1>More About Us</h1>';
    res.render('index', {title, content});
});

app.get('/contact', (req, res) => {
    const title = 'Contact Us';
    const content = '<h1>Contact Us!</h1>';
    res.render('index', {title, content});
});

app.use((req, res) => {
    res.status(404).send(`404 ERROR: You have found CSE 340, but the ${req.url} page does not exist`)
});


app.listen(3000, () => {
    console.log('[PORT 3000] Server is running');
})