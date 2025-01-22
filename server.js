import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.MODE || 'production';
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome!</h1>';
    res.render('index', {title, content, mode, port});
});

app.get('/about', (req, res) => {
    const title = 'About Us';
    const content = '<h1>More About Us!</h1>';
    res.render('index', {title, content, mode, port});
});

app.get('/contact', (req, res) => {
    const title = 'Contact Us';
    const content = '<h1>Contact Us!</h1>';
    res.render('index', {title, content, mode, port});
});

app.use((req, res) => {
    res.status(404).send(`404 ERROR: You have found CSE 340, but the ${req.url} page does not exist`)
});

// When in development mode, start a WebSocket server for live reloading
if (mode.includes('dev')) {
    const ws = await import('ws');

    try {
        const wsPort = parseInt(port) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });

        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });

        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

app.listen(port, () => {
    console.log(`[PORT ${port}] Server is running`);
})