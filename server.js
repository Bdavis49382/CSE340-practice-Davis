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

// Global middleware for behavior depending on environment.
app.use((req, res, next) => {
    res.locals.devEnvironment = mode.includes('dev');
    res.locals.devModeWarning = '<p class="dev-warning">You are in dev mode.</p>';
    res.locals.scripts = [];

    if (res.locals.devEnvironment) {
        res.locals.scripts.push(`
                <script>
                    const ws = new WebSocket(\`ws://\${location.hostname}:${parseInt(port)+ 1}\`);
                    ws.onclose = () => {
                        setTimeout(() => location.reload(), 2000);
                    };
                </script>
            `);
    }

    if (new Date().getSeconds() % 2 == 0) {
        res.locals.scripts.push('<script src="/js/a-test.js"></script>');
    } else {
        res.locals.scripts.push('<script src="/js/b-test.js"></script>')
    }
    next();
})

// Add timestamp
app.use((req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
})

// Set Custom Header
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Express Middleware Tutorial');
    next();
})


app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome!</h1>';
    res.render('index', {title, content});
});

app.get('/about', (req, res) => {
    const title = 'About Us';
    const content = '<h1>More About Us!</h1>';
    res.render('index', {title, content});
});

app.get('/contact', (req, res) => {
    const title = 'Contact Us';
    const content = '<h1>Contact Us!</h1>';
    res.render('index', {title, content});
});

const validateId = (req,res, next) => {
    const id = req.params.id;
    if (isNaN(id))
        res.status(400).send(`${id} is not a number`);
    next();
}

const validateName = (req, res, next) => {
    const { name } = req.params;
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).send('Invalid name: must only contain letters.');
    }
    next();
};
 


// Account page
app.get('/account/:name/:id', validateId, validateName, (req, res) => {
    const {name = 'Not Found', id = 0} = req.params;
    const title = "Account Page";
    const content = `
        <h1>Account Page For ${name}</h1>
        <p>Your Id is: ${req.params.id}</p>
    `;
    res.render('index', { title, content});
});

app.use((req, res) => {
    const url = req.url;
    const title = '404 Error';
    res.status(404).render('404', {title, url});
});

// 500 errors
app.use((err, req, res, next) => {
    const title = '500 error';
    const error = err.message;
    res.status(500).render('500', {title, error})
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